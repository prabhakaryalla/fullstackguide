# 613. Shortest Distance in a Line

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `point` table (`x`) representing points on the x-axis, write a query to report the shortest distance between any two distinct points.

### Schema

```
point: x
```

## Approach

Cross-join the table with itself to consider every pair of distinct points, and take the minimum absolute difference between their `x` values.

## SQL Solution

```sql
SELECT MIN(ABS(p1.x - p2.x)) AS shortest
FROM point p1, point p2
WHERE p1.x != p2.x;
```

## Complexity

- **Time:** `O(n^2)` for the cross join.
- **Space:** `O(1)` extra.
