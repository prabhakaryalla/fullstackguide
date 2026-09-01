# 610. Triangle Judgement

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Triangle` table (`x`, `y`, `z`) representing three side lengths, write a query to report for each row whether the three sides can form a valid triangle.

### Schema

```
Triangle: x, y, z
```

## Approach

Three lengths form a valid triangle exactly when the sum of any two sides strictly exceeds the third (the triangle inequality). Check all three such pairwise comparisons for each row using a `CASE` expression.

## SQL Solution

```sql
SELECT x, y, z,
    CASE
        WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
        ELSE 'No'
    END AS triangle
FROM Triangle;
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result set.
