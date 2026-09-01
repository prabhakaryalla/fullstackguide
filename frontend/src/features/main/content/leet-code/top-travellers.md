# 1407. Top Travellers

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Users` table (`id`, `name`) and a `Rides` table (`id`, `user_id`, `distance`), write a query returning each user's `name` and the total `distance` they have travelled (`travelled_distance`), including users with zero rides. Order the result by `travelled_distance` descending, then by `name` ascending.

### Schema

```
Users: id (PK), name
Rides: id (PK), user_id (FK), distance
```

## Approach

Left join `Users` to `Rides` so that users without any rides are still included, then group by user and sum the distance, defaulting missing sums to `0` with `COALESCE`. Finally, sort by total distance descending and name ascending to break ties.

## SQL Solution

```sql
SELECT
    u.name,
    COALESCE(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON u.id = r.user_id
GROUP BY u.id, u.name
ORDER BY travelled_distance DESC, u.name ASC;
```

## Complexity

- **Time:** `O(n + m)` for the join and aggregation over users and rides.
- **Space:** `O(n)` for the grouped result.
