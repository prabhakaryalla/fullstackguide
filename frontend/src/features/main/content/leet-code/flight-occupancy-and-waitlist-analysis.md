# 2783. Flight Occupancy and Waitlist Analysis

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a `Flights` table (`flight_id`, `total_capacity`) and a `Passengers` table (`passenger_id`, `flight_id`) recording which flight each passenger booked. For every flight, report the number of seats actually occupied (`occupied_cnt`, capped at `total_capacity`) and the number of passengers who could not be seated and are waitlisted (`waitlist_cnt`), ordered by `flight_id`.

### Schema

```
Flights
+------------------+------+
| Column Name      | Type |
+------------------+------+
| flight_id        | int  |
| total_capacity   | int  |
+------------------+------+
flight_id is the primary key.

Passengers
+------------------+------+
| Column Name      | Type |
+------------------+------+
| passenger_id     | int  |
| flight_id        | int  |
+------------------+------+
passenger_id is the primary key.
```

## Approach

Count how many passengers booked each flight using a `LEFT JOIN` plus `GROUP BY` so flights with zero bookings are still included. The occupied seats are the smaller of the booked count and the flight's capacity (`LEAST`), and the waitlisted passengers are whatever exceeds capacity, floored at zero (`GREATEST(booked - capacity, 0)`).

## SQL Solution

```sql
SELECT
    f.flight_id,
    LEAST(COUNT(p.passenger_id), f.total_capacity) AS occupied_cnt,
    GREATEST(COUNT(p.passenger_id) - f.total_capacity, 0) AS waitlist_cnt
FROM Flights f
LEFT JOIN Passengers p ON p.flight_id = f.flight_id
GROUP BY f.flight_id, f.total_capacity
ORDER BY f.flight_id;
```

## Complexity

- **Time:** O(P + F log F) for the join, grouping, and final sort
- **Space:** O(F) for the grouped result
