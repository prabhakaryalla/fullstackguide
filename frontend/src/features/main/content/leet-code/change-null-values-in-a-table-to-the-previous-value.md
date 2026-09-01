# 2388. Change Null Values in a Table to the Previous Value

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to replace the `NULL` values in the `category` column with the value from the closest preceding row (ordered by `id`) that has a non-`NULL` category. It is guaranteed that the first row (smallest `id`) always has a non-`NULL` category.

### Schema

```
Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| category    | varchar |
+-------------+---------+
id is the primary key for this table.
category can contain NULL values; the row with the smallest id is guaranteed to be non-NULL.
```

## Approach

Build a "group" marker for each row using a running count of non-`NULL` categories ordered by `id` (`SUM` of an indicator column as a window function). Every row belongs to the group started by the most recent non-`NULL` row above it. Within each group, `FIRST_VALUE` (ordered by `id`) returns that group's non-`NULL` category, which is exactly the value that should fill in for the `NULL` rows.

## SQL Solution

```sql
SELECT id,
       FIRST_VALUE(category) OVER (
           PARTITION BY grp ORDER BY id
       ) AS category
FROM (
    SELECT id,
           category,
           SUM(CASE WHEN category IS NOT NULL THEN 1 ELSE 0 END) OVER (ORDER BY id) AS grp
    FROM Products
) AS t
ORDER BY id;
```

## Complexity

- **Time:** O(n log n) for the sort/window operations
- **Space:** O(n)
