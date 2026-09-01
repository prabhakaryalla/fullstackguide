# 612. Shortest Distance in a Plane

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `point2D` table (`x`, `y`) representing points on a 2D plane, write a query to report the shortest distance between any two distinct points, rounded to 2 decimal places.

### Schema

```
point2D: x, y
```

## Approach

Cross-join the table with itself to consider every pair of points, excluding a point paired with itself. Compute the Euclidean distance for each pair using the standard distance formula, and take the minimum across all pairs.

## SQL Solution

```sql
SELECT ROUND(MIN(SQRT(POWER(p1.x - p2.x, 2) + POWER(p1.y - p2.y, 2))), 2) AS shortest
FROM point2D p1, point2D p2
WHERE p1.x != p2.x OR p1.y != p2.y;
```

## Complexity

- **Time:** `O(n^2)` for the cross join.
- **Space:** `O(1)` extra.
