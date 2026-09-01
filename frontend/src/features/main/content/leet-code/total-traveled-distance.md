# 2837. Total Traveled Distance

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a `Users` table (`user_id`, `name`) and a `Rides` table (`ride_id`, `user_id`, `distance`) that records the distance traveled on each ride. For every user, report the total distance they have traveled across all their rides, showing `0` for users with no rides, ordered by `user_id`.

### Schema

```
Users
+------------------+------+
| Column Name      | Type |
+------------------+------+
| user_id          | int  |
| name             | varchar |
+------------------+------+
user_id is the primary key.

Rides
+------------------+------+
| Column Name      | Type |
+------------------+------+
| ride_id          | int  |
| user_id          | int  |
| distance         | int  |
+------------------+------+
ride_id is the primary key.
```

## Approach

Use a `LEFT JOIN` from `Users` to `Rides` so users without any rides are still included, then `GROUP BY` the user and sum the `distance` column, using `COALESCE` to turn a `NULL` sum (no rides) into `0`.

## SQL Solution

```sql
SELECT
    u.user_id,
    u.name,
    COALESCE(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON r.user_id = u.user_id
GROUP BY u.user_id, u.name
ORDER BY u.user_id;
```

## Complexity

- **Time:** O(U + R) for the join and aggregation, plus O(U log U) for the final sort
- **Space:** O(U) for the grouped result
