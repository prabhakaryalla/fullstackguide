# 2112. The Airport With the Most Traffic

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to find the airport(s) with the most traffic, where traffic is defined as the total number of flights either departing from or arriving at that airport.

### Schema

```
Table: Flights
+-------------------+---------+
| Column Name       | Type    |
+-------------------+---------+
| departure_airport | int     |
| arrival_airport   | int     |
| flights_count     | int     |
+-------------------+---------+
```

## Approach

Union the departure and arrival airports with their respective flight counts, then group by airport to sum total traffic. Select the airport(s) with the maximum total traffic using a subquery or window function.

## SQL Solution

```sql
WITH Traffic AS (
    SELECT departure_airport AS airport, flights_count FROM Flights
    UNION ALL
    SELECT arrival_airport AS airport, flights_count FROM Flights
),
AirportTraffic AS (
    SELECT airport, SUM(flights_count) AS total_traffic
    FROM Traffic
    GROUP BY airport
)
SELECT airport
FROM AirportTraffic
WHERE total_traffic = (SELECT MAX(total_traffic) FROM AirportTraffic);
```

## Complexity

- **Time:** O(n) for scanning and aggregating
- **Space:** O(n) for intermediate results
