# 2978. Symmetric Coordinates

**Difficulty:** Medium
**Category:** Array, Hash Table, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Coordinates
+-------------+------+
| Column Name | Type |
+-------------+------+
| X           | int  |
| Y           | int  |
+-------------+------+
(X, Y) is the primary key.
Each row contains coordinates (X, Y).
```

Two coordinates (X1, Y1) and (X2, Y2) are symmetric if X1 = Y2 and Y1 = X2. Return all symmetric coordinate pairs in ascending order by X, then Y.

### Example

```
Input:
Coordinates table:
+----+----+
| X  | Y  |
+----+----+
| 20 | 20 |
| 20 | 21 |
| 21 | 20 |
| 21 | 21 |
+----+----+
Output:
+----+----+
| X  | Y  |
+----+----+
| 20 | 20 |
| 20 | 21 |
| 21 | 20 |
+----+----+
```

## Approach

Self-join the table to find pairs where (X1, Y1) has a matching (Y1, X1). Handle the special case where X = Y separately.

## SQL Solution

```sql
SELECT DISTINCT c1.X, c1.Y
FROM Coordinates c1
JOIN Coordinates c2 ON c1.X = c2.Y AND c1.Y = c2.X
WHERE c1.X <= c1.Y
ORDER BY c1.X, c1.Y;
```

## Complexity

- **Time:** O(n²) for join operation
- **Space:** O(n) for result
