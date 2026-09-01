# 2793. Status of Flight Tickets

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Table `Flights(flight_id, capacity)` records each flight's seat capacity, and table `Passengers(passenger_id, flight_id, request_time)` records every passenger's ticket request for a flight. Requests for the same flight are processed strictly in order of `request_time` (ties broken by `passenger_id`); a request is `"Confirmed"` if the flight still has remaining capacity when it is processed, and `"Waitlist"` otherwise. Report, for every request, its `passenger_id`, `flight_id`, and `status`.

### Schema
```
Flights: flight_id, capacity
Passengers: passenger_id, flight_id, request_time
```

## Approach
Rank each passenger's request within its flight by `request_time` (tie-broken by `passenger_id`) using `ROW_NUMBER()`, then compare that rank to the flight's `capacity`: ranks at or below capacity are `"Confirmed"`, and the rest are `"Waitlist"`.

## SQL Solution

```sql
SELECT
    p.passenger_id,
    p.flight_id,
    CASE WHEN p.rn <= f.capacity THEN 'Confirmed' ELSE 'Waitlist' END AS status
FROM (
    SELECT
        passenger_id,
        flight_id,
        request_time,
        ROW_NUMBER() OVER (
            PARTITION BY flight_id
            ORDER BY request_time, passenger_id
        ) AS rn
    FROM Passengers
) p
JOIN Flights f ON f.flight_id = p.flight_id
ORDER BY p.flight_id, p.request_time;
```

## Complexity

- **Time:** O(n log n) for the window-function ordering.
- **Space:** O(n).
