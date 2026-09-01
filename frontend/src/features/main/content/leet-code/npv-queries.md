# 1421. NPV Queries

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `NPV` table (`id`, `year`, `npv`) and a `Queries` table (`id`, `year`), write a query that returns, for every row in `Queries`, the matching `npv` value from `NPV` (using both `id` and `year`), or `0` if no matching record exists.

### Schema

```
NPV: (id, year) (PK), npv
Queries: (id, year) (PK)
```

## Approach

Left join `Queries` to `NPV` on both `id` and `year` so unmatched queries are preserved, then default any missing `npv` value to `0` with `COALESCE`.

## SQL Solution

```sql
SELECT
    q.id,
    q.year,
    COALESCE(n.npv, 0) AS npv
FROM Queries q
LEFT JOIN NPV n ON q.id = n.id AND q.year = n.year;
```

## Complexity

- **Time:** `O(n + m)` for the join between queries and NPV rows.
- **Space:** `O(n)` for the result set.
