# 3308. Find Top Performing Driver

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a `Drivers` table and a `Rides` table recording each ride's driver and earnings, find the driver with the highest total earnings across all their rides. If multiple drivers tie for the highest total, return the one with the smallest `driver_id`.

### Schema
```sql
Create table If Not Exists Drivers (driver_id int, name varchar(50))
Create table If Not Exists Rides (ride_id int, driver_id int, distance int, earnings int)
```

## Approach
Join the two tables, group by driver, and sum each driver's earnings. Order the aggregated results by total earnings descending, using `driver_id` ascending as a tiebreaker, then take the top row.

## SQL Solution

```sql
SELECT d.driver_id, d.name, SUM(r.earnings) AS total_earnings
FROM Drivers d
JOIN Rides r ON r.driver_id = d.driver_id
GROUP BY d.driver_id, d.name
ORDER BY total_earnings DESC, d.driver_id ASC
LIMIT 1;
```

## Complexity

- **Time:** O(n log n) for the aggregation and sort, where `n` is the number of rides.
- **Space:** O(n)
