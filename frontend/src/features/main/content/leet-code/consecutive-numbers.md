# 180. Consecutive Numbers

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given a `Logs` table (`id`, `num`) where `id` is a sequential auto-increment key, write a query to find all numbers that appear at least three times consecutively (three or more rows in a row with the same `num`, by `id` order).

### Schema

```
Logs: id (PK, sequential), num
```

## Approach

Self-join the table with itself twice, shifted by `id + 1` and `id + 2`, comparing `num` across all three offsets — a match across all three means three consecutive rows share the same value. Wrap in `DISTINCT` since a longer run (4+) would otherwise produce duplicate matches.

## SQL Solution

```sql
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l2.id = l1.id + 1
JOIN Logs l3 ON l3.id = l1.id + 2
WHERE l1.num = l2.num AND l2.num = l3.num;
```

## Complexity

- **Time:** `O(n)` with an index on `id`, where `n` is the number of log rows.
- **Space:** `O(n)` worst case for the result set.
