# Design Google Maps (Maps & Navigation)

Google Maps renders map tiles for the whole world, geocodes addresses, and computes fast routes across a road network with billions of edges — while continuously factoring in live traffic.

In system design interviews, this question tests your understanding of map tiling, graph-based routing algorithms (and why naive Dijkstra doesn't scale), and how real-time traffic data is layered into routing.

## 1. Problem Statement

Design a system like Google Maps that supports:

- rendering map imagery at multiple zoom levels
- converting an address into coordinates (geocoding) and back (reverse geocoding)
- computing the fastest route between two points, accounting for live traffic
- rerouting in real time as a driver deviates from the planned route

## 2. Requirements

### Functional

- Serve map tiles at various zoom levels for any region.
- Geocode addresses to lat/lng and reverse geocode lat/lng to addresses.
- Compute routes (driving/walking/transit) with turn-by-turn directions.
- Incorporate live traffic into ETA and rerouting.

### Non-Functional

- Route computation must return in a few hundred milliseconds even on transcontinental routes.
- Map tile serving is enormously read-heavy and must be globally low-latency (CDN-backed).
- Road network and traffic data update continuously without taking routing offline.
- High availability — navigation is often safety-relevant (driving directions).

## 3. Scale (Rough Estimate)

Assume:

- Global road network: hundreds of millions of road segments (edges) and intersections (nodes).
- 1B+ users, hundreds of millions of route requests/day.
- Map tile requests dwarf routing requests by orders of magnitude (every pan/zoom fetches tiles).

Implications:

- The full road graph is far too large for naive Dijkstra per request at interactive latency — needs precomputed shortcuts (contraction hierarchies) or hierarchical routing.
- Map tiles are static-ish, highly cacheable images/vector data — a textbook CDN use case.
- Live traffic must update edge weights continuously without rebuilding the entire routing structure from scratch each time.

## 4. API Design

### Map Tiles

- `GET /api/v1/tiles/{zoom}/{x}/{y}.png` (or vector tile format) — cached aggressively at the CDN edge.

### Geocoding

- `GET /api/v1/geocode?address={text}` → `{ lat, lng }`
- `GET /api/v1/reverse-geocode?lat={lat}&lng={lng}` → `{ address }`

### Routing

- `GET /api/v1/directions?origin={lat,lng}&destination={lat,lng}&mode=driving`
- Response: ordered route segments, distance, ETA, turn-by-turn steps.

### Live Reroute

- `POST /api/v1/directions/{routeId}/reroute` — Body: `currentLat`, `currentLng` (called when the driver deviates).

## 5. High-Level Architecture

```archify
diagrams/sd-google-maps-architecture.html
```

## 6. Database Schema

**road_nodes**

- `node_id` (PK), `lat`, `lng` (intersections/waypoints)

**road_edges**

- `edge_id` (PK), `from_node_id`, `to_node_id`, `base_travel_time`, `distance`, `road_type`

**edge_traffic_weights** (frequently updated, often in-memory/cache-backed)

- `edge_id`, `current_speed_factor`, `updated_at`

**tiles**

- `zoom`, `x`, `y` (composite PK) → pre-rendered tile blob reference (served via CDN, rarely hits origin)

**places** (for geocoding/search)

- `place_id`, `name`, `lat`, `lng`, `address_text` — indexed for both text search and geospatial proximity.

## 7. Map Tiling

The world map is pre-rendered into tiles at each zoom level using a standard `(zoom, x, y)` scheme, where higher zoom levels subdivide the same area into more, smaller tiles.

```text
tile_x = floor((lng + 180) / 360 * 2^zoom)
tile_y = floor((1 - ln(tan(lat_rad) + 1/cos(lat_rad)) / pi) / 2 * 2^zoom)
```

Tiles are generated offline/asynchronously from source map data and pushed to a CDN — the client simply requests `(zoom, x, y)` tiles as it pans/zooms, and almost every request is served from cache at the edge.

## 8. Routing: Why Not Naive Dijkstra

Plain Dijkstra's algorithm on a graph with hundreds of millions of edges is far too slow for an interactive request. Real routing engines use precomputation:

### Contraction Hierarchies (high level)

```archify
diagrams/sd-google-maps-contraction-hierarchies.html
```

- Offline, nodes are contracted in order of "unimportance" (e.g., a small side-street intersection is contracted before a highway junction), adding shortcut edges that skip over them while preserving shortest-path distances.
- Online, a bidirectional search over this contracted graph only needs to explore a small, high-importance subset of nodes/edges — turning a graph search over hundreds of millions of edges into one that touches a tiny fraction of them, fast enough for interactive queries.

## 9. Routing Flow with Live Traffic

```archify
diagrams/sd-google-maps-routing-sequence.html
```

Traffic-adjusted weights are applied as a layer on top of the precomputed contracted graph rather than requiring the whole hierarchy to be rebuilt whenever traffic changes.

## 10. Live Traffic Pipeline

```archify
diagrams/sd-google-maps-traffic-pipeline.html
```

Anonymized, crowdsourced location data from phones running the maps app is aggregated per road segment to estimate current speeds, which are periodically pushed into the edge-weight cache that the routing service reads at query time.

## 11. Key Components

- **Tile service + CDN** — pre-rendered map imagery served almost entirely from edge cache; the dominant traffic volume in the whole system.
- **Road graph store with contraction hierarchies** — the core data structure making sub-second routing possible over a planet-scale graph.
- **Live traffic service** — continuously updates edge weights from aggregated, anonymized location data without requiring the routing graph to be rebuilt.
- **Geocoding service** — a separate text/geospatial index mapping addresses ↔ coordinates.
- **Reroute handler** — detects deviation from the planned route (via live location) and triggers a fresh routing query from the driver's current position.

## 12. Key Challenges

- **Planet-scale graph at interactive latency** — solved by offline precomputation (contraction hierarchies) rather than trying to make plain Dijkstra faster at query time.
- **Keeping traffic data fresh without rebuilding the graph** — edge weights are a separate, frequently-updated layer on top of a mostly-static contracted graph structure.
- **Map data freshness** — new roads/closures must propagate into both the tile imagery and the routing graph, typically via periodic offline rebuilds rather than instant updates.
- **Global tile storage volume** — storing pre-rendered tiles at every zoom level for the whole planet is enormous; solved by generating tiles lazily/on-demand for rarely-viewed regions and aggressively caching popular ones.

## 13. Interview Tips

- Explicitly explain why naive Dijkstra doesn't scale to planet-sized graphs, then introduce contraction hierarchies (or at least hierarchical/landmark-based routing) as the fix — this is the signature insight interviewers look for.
- Separate map tile serving (a caching/CDN problem) from routing (a graph algorithm problem) — they have very different scaling stories.
- Mention that traffic data is a dynamic weight layer applied on top of a mostly-static precomputed graph, not something requiring full graph rebuilds per update.
- If time allows, briefly mention geocoding as its own indexing problem (text search + geospatial), distinct from routing.

## 14. Summary

Google Maps splits into three largely independent subsystems: a CDN-backed tile service for map imagery, a geocoding index for address lookup, and a routing engine built on precomputed contraction hierarchies that make shortest-path queries over a planet-scale graph feasible in milliseconds. Live traffic is layered on top as continuously updated edge weights, letting ETAs and routes stay current without rebuilding the underlying graph structure.
