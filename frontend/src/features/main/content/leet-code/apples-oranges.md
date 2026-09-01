# 1445. Apples & Oranges

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Sales` table (`sale_date`, `fruit`, `sold_num`) where `fruit` is either `'apples'` or `'oranges'`, report for each `sale_date` the difference between the number of apples sold and oranges sold (`diff`), ordered by date.

### Schema

```
Sales: (sale_date, fruit) (PK), sold_num
```

## Approach

Group rows by `sale_date` and use a conditional sum: add `sold_num` when the fruit is apples, subtract it when the fruit is oranges. The resulting per-date total is exactly the requested difference.

## SQL Solution

```sql
SELECT
    sale_date,
    SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date
ORDER BY sale_date;
```

## Complexity

- **Time:** `O(n log n)` for the grouping/sorting.
- **Space:** `O(n)` for the grouped result.
