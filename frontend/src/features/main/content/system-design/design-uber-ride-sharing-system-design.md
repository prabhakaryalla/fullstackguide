# Design Uber (Ride-Sharing)

A ride-sharing platform matches nearby riders and drivers in real time, tracks trips as they progress, and computes fair, dynamic pricing — all while both parties' locations are constantly moving.

In system design interviews, this question tests your understanding of geospatial indexing, real-time location ingestion, and matching algorithms under tight latency budgets.

## 1. Problem Statement

Design a system like Uber that supports:

- riders requesting a trip from location A to B
- matching the request to a nearby available driver
- tracking driver and rider location in real time during the trip
- computing the fare, including surge pricing

## 2. Requirements

### Functional

- Drivers periodically report their live location.
- Riders request a ride; the system finds and assigns a nearby driver.
- Both parties can track the trip's live location until it ends.
- Fare is calculated based on distance/time, with surge pricing during high demand.

### Non-Functional

- Matching must complete in a few seconds — riders won't wait long for a response.
- Location updates arrive at very high frequency (every few seconds per active driver).
- Must tolerate driver app disconnects/network flakiness gracefully.
- Strong consistency isn't required for location; eventual consistency is fine, but trip state (accepted/started/completed) must be reliable.

## 3. Scale (Rough Estimate)

Assume:

- 5M active drivers globally, each sending a location ping every 4 seconds → ~1.25M location writes/sec at peak.
- 20M ride requests/day → ~230 requests/sec average, bursty around commute hours.
- Each match must scan drivers within a few km radius — with even distribution, that's a few hundred candidate drivers per request, not the whole city.

Implications:

- Location writes are the dominant load — this must be an in-memory, geospatially indexed store, not a traditional relational table.
- Matching needs a spatial index (geohash/quadtree), not a full table scan.
- Trip state and payment need durable, transactional storage — different consistency requirements than location pings.

## 4. API Design

### Driver Location Update

- `POST /api/v1/drivers/{id}/location`
- Body: `lat`, `lng`, `timestamp`
- High-frequency, fire-and-forget style (often over a persistent WebSocket, not per-call REST)

### Request Ride

- `POST /api/v1/rides`
- Body: `pickupLat`, `pickupLng`, `dropoffLat`, `dropoffLng`
- Response: `rideId`, `status: matching`

### Ride Status / Live Tracking

- `GET /api/v1/rides/{id}` — or a WebSocket subscription for live updates
- Response: `status`, `driverLocation`, `eta`

### Driver Accept/Reject

- `POST /api/v1/rides/{id}/accept`
- `POST /api/v1/rides/{id}/reject`

## 5. High-Level Architecture

```archify
diagrams/sd-uber-architecture.html
```

## 6. Database Schema

**drivers**

- `driver_id` (PK), `name`, `vehicle_info`, `status` (online/offline/on_trip)
- Live location is **not** stored here — it lives in the geospatial index (in-memory), not the relational store.

**trips**

- `trip_id` (PK), `rider_id`, `driver_id`, `pickup_lat/lng`, `dropoff_lat/lng`, `status` (requested/matched/in_progress/completed/cancelled), `fare`, `created_at`, `completed_at`

**trip_location_history** (append-only, for ETA/replay/auditing)

- `trip_id`, `lat`, `lng`, `timestamp`

**pricing_zones**

- `zone_id`, `geohash_prefix`, `current_surge_multiplier`, `updated_at`

## 7. Geospatial Indexing

Riders and drivers are matched by proximity, so the driver location store must support "find all drivers within radius R of (lat, lng)" efficiently.

- **Geohash**: encode `(lat, lng)` into a string where nearby points share a prefix. Store drivers in buckets keyed by geohash prefix; searching nearby drivers means checking the current cell and its 8 neighboring cells.
- **Quadtree**: recursively divide the map into quadrants until each leaf holds a small number of drivers — adapts naturally to uneven driver density (dense in cities, sparse in rural areas).

```text
geohash("37.7749,-122.4194", precision=6) -> "9q8yyk"
// Drivers with the same 6-character geohash prefix are roughly within ~1.2km of each other
```

Redis's `GEOADD`/`GEOSEARCH` (backed by geohash + sorted sets) is a common practical choice since it keeps the whole index in memory for sub-millisecond lookups.

## 8. Matching Flow

```archify
diagrams/sd-uber-matching-sequence.html
```

If no driver accepts after several candidates, the rider sees "no drivers available" or the search radius expands.

## 9. Real-Time Location Pipeline

```archify
diagrams/sd-uber-location-pipeline.html
```

Location pings update the in-memory index synchronously (so matching sees fresh data) while fanning out asynchronously to riders currently tracking a trip and to durable history storage for auditing/ETA modeling.

## 10. Surge Pricing

- Continuously compute a demand/supply ratio per geo-zone (open ride requests vs. available drivers).
- When demand exceeds supply meaningfully, apply a surge multiplier to the base fare in that zone.
- Multiplier is recalculated on a short interval (e.g., every 1-2 minutes) to avoid rapid, jarring price swings, and is shown to the rider **before** they confirm the trip.

## 11. Key Components

- **Location gateway** — ingests extremely high-frequency location pings and writes into the geospatial index with minimal latency.
- **Geospatial index** — the core data structure enabling "find nearby drivers" in near-constant time instead of scanning the whole fleet.
- **Matching service** — ranks nearby candidates and manages the accept/timeout/re-offer loop.
- **Trip state machine** — the durable, transactional source of truth for a trip's lifecycle (requested → matched → in_progress → completed).
- **Pricing service** — consumes real-time demand/supply signals to compute surge multipliers per zone.

## 12. Key Challenges

- **Freshness vs. cost of location data** — pinging too frequently wastes battery/bandwidth; too infrequently makes matching and ETAs stale. Adaptive ping intervals (faster when moving, slower when idle) balance this.
- **Race conditions in matching** — two riders could be offered the same driver simultaneously; the matching service must atomically "lock" a driver once an offer is sent.
- **Driver rejection cascades** — if the top-ranked driver keeps declining, the rider's wait time grows; systems often offer to multiple candidates in parallel with a short timeout instead of strictly sequential offers.
- **Surge pricing fairness/gaming** — must prevent drivers from manufacturing artificial scarcity (e.g., mass logging off) to trigger surge.

## 13. Interview Tips

- Lead with the geospatial index — it's the crux of this problem, and interviewers expect you to name geohash or quadtree and explain the "nearby cell" lookup.
- Separate the high-frequency, ephemeral location data from the durable, transactional trip data — conflating them into one database is a common mistake.
- Mention the matching timeout/re-offer loop; a naive "always assign the single closest driver" ignores the reality that drivers can decline.
- Bring up surge pricing only after the core matching flow is solid — it's a good follow-up topic, not the main event.

## 14. Summary

Uber's core challenge is proximity matching at scale: an in-memory geospatial index (geohash or quadtree) enables fast "nearby drivers" lookups, a matching service handles the offer/accept/timeout loop, and a durable trip state machine tracks the transactional lifecycle separately from the high-frequency, ephemeral location stream. Surge pricing layers a real-time demand/supply signal on top of this same location pipeline.
