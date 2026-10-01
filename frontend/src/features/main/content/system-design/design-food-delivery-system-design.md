# Design Food Delivery (Zomato/Swiggy)

A food delivery platform connects three parties in real time — customers, restaurants, and delivery partners — coordinating order placement, kitchen preparation, and live delivery tracking within a tight time window.

In system design interviews, this question tests your understanding of multi-party state machines, delivery-partner matching (similar to ride-sharing), and combining ETA estimation across both "food prep time" and "travel time".

## 1. Problem Statement

Design a system like Zomato/Swiggy that supports:

- browsing nearby restaurants and menus
- placing an order that a restaurant accepts/prepares
- assigning a nearby delivery partner and tracking delivery live
- accurate ETA combining prep time and travel time

## 2. Requirements

### Functional

- Search nearby restaurants, browse menu, place an order.
- Restaurant accepts the order and marks prep progress.
- System assigns a delivery partner once food is ready (or nearly ready).
- Customer tracks delivery partner's live location until drop-off.

### Non-Functional

- ETA must be reasonably accurate — it drives customer trust more than almost any other metric.
- Delivery partner matching should account for both proximity and current load (already-assigned deliveries).
- High availability during meal-time traffic spikes (lunch/dinner rushes).
- Order state must be reliably tracked across restaurant, delivery partner, and customer apps.

## 3. Scale (Rough Estimate)

Assume:

- 50M orders/day concentrated heavily around lunch (~1-2pm) and dinner (~7-9pm) windows.
- Peak QPS during rush could be 10-20x the daily average due to this concentration.
- Each order requires matching against delivery partners within a small radius (a few km), similar in shape to ride-sharing matching but with an added restaurant-prep-time dimension.

Implications:

- Capacity must be provisioned for sharp meal-time peaks, not average daily load — autoscaling and queuing at the order-intake layer matter more than in a flatter-traffic system.
- Delivery partner matching reuses the same geospatial-index approach as ride-sharing (see Design Uber), just triggered by restaurant readiness instead of immediate rider request.
- ETA computation is a composite of two independently variable stages (kitchen prep + travel), not a single distance calculation.

## 4. API Design

### Browse

- `GET /api/v1/restaurants?lat={lat}&lng={lng}` — nearby restaurants
- `GET /api/v1/restaurants/{id}/menu`

### Place Order

- `POST /api/v1/orders` — Body: `restaurantId`, `items`, `deliveryAddress`
- Response: `orderId`, `status: placed`

### Restaurant Order Management

- `POST /api/v1/orders/{id}/accept`
- `POST /api/v1/orders/{id}/status` — Body: `status` (preparing/ready_for_pickup)

### Delivery Partner Assignment / Tracking

- `POST /api/v1/orders/{id}/assign-partner` (system-triggered)
- `GET /api/v1/orders/{id}/tracking` — live partner location + ETA

## 5. High-Level Architecture

```archify
diagrams/sd-food-delivery-architecture.html
```

## 6. Database Schema

**restaurants**

- `restaurant_id` (PK), `name`, `lat`, `lng`, `avg_prep_time_minutes`, `is_open`

**menu_items**

- `restaurant_id`, `item_id`, `name`, `price`, `is_available`

**orders**

- `order_id` (PK), `customer_id`, `restaurant_id`, `delivery_partner_id` (nullable until assigned), `status` (placed/accepted/preparing/ready/picked_up/delivered/cancelled), `created_at`

**order_items**

- `order_id`, `item_id`, `quantity`, `unit_price`

**delivery_partners**

- `partner_id` (PK), `status` (available/on_delivery/offline), `current_load` (active deliveries count)
- Live location lives in the geospatial index, not this relational table (same pattern as ride-sharing).

**order_location_history** (for live tracking/ETA refinement)

- `order_id`, `lat`, `lng`, `timestamp`

## 7. Order State Machine

```archify
diagrams/sd-food-delivery-lifecycle.html
```

Each transition is driven by an explicit event (restaurant action, partner action, or system timeout), and every state change is recorded so both the customer and delivery partner apps can subscribe to live updates.

## 8. Delivery Partner Matching Flow

```archify
diagrams/sd-food-delivery-matching.html
```

Matching is often triggered slightly **before** food is fully ready (based on the prep-time estimate), so the delivery partner arrives close to pickup-ready time instead of waiting idle at the restaurant.

## 9. Composite ETA Pipeline

```archify
diagrams/sd-food-delivery-eta.html
```

Unlike ride-sharing (where ETA is purely a travel-time problem), food delivery ETA blends a variable kitchen-side estimate with a variable travel-side estimate, and re-estimates continuously as the order moves through its state machine.

## 10. Key Components

- **Order service** — owns the order state machine and coordinates state changes across restaurant, matching, and delivery apps.
- **Delivery matching service** — reuses geospatial-index-based nearby-partner search (same core idea as ride-sharing), additionally weighted by partner's current delivery load.
- **ETA service** — combines a kitchen prep-time model with a travel-time model (itself reusing routing/traffic concepts), continuously refined as state changes occur.
- **Restaurant service** — manages menu availability and prep-time signals that feed directly into ETA and matching timing.
- **Notification/tracking service** — pushes live state and location updates to both customer and delivery partner apps.

## 11. Key Challenges

- **Meal-time traffic spikes** — capacity planning must target peak lunch/dinner concentration, not flat daily averages; queuing and graceful degradation (e.g., temporarily hiding busy restaurants) help absorb bursts.
- **Prep-time variability** — a restaurant's actual prep time varies with kitchen load; naive fixed estimates lead to delivery partners waiting idle or arriving too late, both hurting the metric that matters most (ETA accuracy).
- **Matching timing** — assigning a partner too early wastes their time waiting at the restaurant; too late delays pickup — this timing decision is a core tuning problem specific to food delivery (not present in ride-sharing).
- **Order cancellations mid-flight** — a cancellation after a delivery partner is already en route requires compensating logic (partial payment to partner, refund rules to customer).

## 12. Interview Tips

- Explicitly mention that delivery-partner matching borrows the ride-sharing geospatial-matching pattern — showing you can transfer a pattern across problems is a strong signal.
- Highlight the composite ETA (prep time + travel time) as the key differentiator from a pure ride-sharing/logistics problem — this is what interviewers usually want to see you identify.
- Discuss meal-time traffic concentration explicitly when talking about scale — a flat "requests per second" assumption misses the real capacity challenge.
- Keep the order state machine explicit (a diagram or clear list of states/transitions) — it's an easy way to demonstrate structured thinking.

## 13. Summary

Food delivery systems combine an explicit multi-party order state machine with delivery-partner matching that mirrors ride-sharing's geospatial approach, but layer in a composite ETA that blends variable kitchen prep time with travel time. Meal-time traffic concentration — rather than flat average load — is the defining scale challenge, driving capacity planning and matching-timing decisions throughout the design.
