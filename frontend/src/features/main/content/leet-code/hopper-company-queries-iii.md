# 1651. Hopper Company Queries III

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Using the same `Drivers`, `Rides`, and `AcceptedRides` tables as Hopper Company Queries I/II, report for every month of 2020 (starting from the second month, since a comparison needs a prior month) the percentage change versus the previous month in both the average accepted ride distance and the average accepted ride duration.

### Schema

```
Drivers: driver_id (PK), join_date
Rides: ride_id (PK), user_id, requested_at
AcceptedRides: ride_id (PK, FK), driver_id, ride_distance, ride_duration
```

## Approach

Build a monthly statistics CTE with the average accepted `ride_distance` and `ride_duration` for each month of 2020 (via correlated subqueries joining `AcceptedRides` to `Rides`). Use the window function `LAG` ordered by month to fetch the previous month's averages, then compute `(current - previous) / previous * 100`, rounded to 2 decimals, excluding month 1 since it has no prior month to compare against.

## SQL Solution

```sql
WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1 FROM months WHERE month < 12
),
monthly_stats AS (
    SELECT
        m.month,
        (
            SELECT AVG(ar.ride_distance)
            FROM AcceptedRides ar
            JOIN Rides r ON ar.ride_id = r.ride_id
            WHERE MONTH(r.requested_at) = m.month AND YEAR(r.requested_at) = 2020
        ) AS avg_distance,
        (
            SELECT AVG(ar.ride_duration)
            FROM AcceptedRides ar
            JOIN Rides r ON ar.ride_id = r.ride_id
            WHERE MONTH(r.requested_at) = m.month AND YEAR(r.requested_at) = 2020
        ) AS avg_duration
    FROM months m
)
SELECT
    month,
    ROUND(
        (avg_distance - LAG(avg_distance) OVER (ORDER BY month)) * 100.0
        / LAG(avg_distance) OVER (ORDER BY month), 2
    ) AS distance_change,
    ROUND(
        (avg_duration - LAG(avg_duration) OVER (ORDER BY month)) * 100.0
        / LAG(avg_duration) OVER (ORDER BY month), 2
    ) AS duration_change
FROM monthly_stats
WHERE month > 1
ORDER BY month;
```

## Complexity

- **Time:** `O(months * rides)` for the correlated subqueries.
- **Space:** `O(months)` for the result set.
