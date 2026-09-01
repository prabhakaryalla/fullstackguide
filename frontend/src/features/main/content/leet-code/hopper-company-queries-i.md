# 1635. Hopper Company Queries I

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Drivers` (`driver_id`, `join_date`) and ride tables recording activity throughout the year 2020, report for each month of 2020 the cumulative number of "active" drivers — those who joined the platform on or before the last day of that month.

### Schema

```
Drivers: driver_id (PK), join_date
Rides: ride_id (PK), user_id, requested_at
AcceptedRides: ride_id (PK, FK), driver_id, ride_distance, ride_duration
```

## Approach

Generate the twelve months of 2020 with a recursive CTE, then for each month use a correlated subquery to count drivers whose `join_date` falls on or before the last calendar day of that month — this naturally accumulates drivers across months since a driver who joined in an earlier month remains counted in every later month.

## SQL Solution

```sql
WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1 FROM months WHERE month < 12
)
SELECT
    m.month,
    (
        SELECT COUNT(*)
        FROM Drivers d
        WHERE d.join_date <= LAST_DAY(STR_TO_DATE(CONCAT('2020-', m.month, '-01'), '%Y-%m-%d'))
    ) AS active_drivers
FROM months m
ORDER BY m.month;
```

## Complexity

- **Time:** `O(months * drivers)` for the correlated subqueries.
- **Space:** `O(months)` for the result set.
