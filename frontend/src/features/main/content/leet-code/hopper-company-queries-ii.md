# 1645. Hopper Company Queries II

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Using the same `Drivers`, `Rides`, and `AcceptedRides` tables as Hopper Company Queries I, report for each month of 2020 the "working percentage": the percentage of that month's cumulative active drivers who accepted at least one ride during the month, rounded to 2 decimals, treated as `0` when there are no active drivers yet.

### Schema

```
Drivers: driver_id (PK), join_date
Rides: ride_id (PK), user_id, requested_at
AcceptedRides: ride_id (PK, FK), driver_id, ride_distance, ride_duration
```

## Approach

Generate the twelve months with a recursive CTE. For each month, count distinct drivers who accepted a ride that month (joining `AcceptedRides` to `Rides` for the request date), and divide by the cumulative active-driver count from Hopper Company Queries I (drivers who joined on or before that month's last day), guarding against a zero denominator with `NULLIF` and defaulting to `0` with `IFNULL`.

## SQL Solution

```sql
WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1 FROM months WHERE month < 12
)
SELECT
    m.month,
    ROUND(
        IFNULL(
            (
                SELECT COUNT(DISTINCT ar.driver_id)
                FROM AcceptedRides ar
                JOIN Rides r ON ar.ride_id = r.ride_id
                WHERE MONTH(r.requested_at) = m.month AND YEAR(r.requested_at) = 2020
            ) * 100.0 /
            NULLIF(
                (
                    SELECT COUNT(*)
                    FROM Drivers d
                    WHERE d.join_date <= LAST_DAY(STR_TO_DATE(CONCAT('2020-', m.month, '-01'), '%Y-%m-%d'))
                ), 0
            ),
        0),
    2) AS working_percentage
FROM months m
ORDER BY m.month;
```

## Complexity

- **Time:** `O(months * (rides + drivers))` for the correlated subqueries.
- **Space:** `O(months)` for the result set.
