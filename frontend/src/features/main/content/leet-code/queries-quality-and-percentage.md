# 1211. Queries Quality and Percentage

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Queries` table (`query_name`, `result`, `position`, `rating`), define `quality` as the average of `rating / position` for a query name, and `poor_query_percentage` as the percentage of that query name's ratings that are less than `3`. Report both, rounded to 2 decimal places, per `query_name`.

### Schema

```
Queries: query_name, result, position, rating
```

## Approach

Group the rows by `query_name`. For `quality`, average the ratio `rating / position` across the group. For `poor_query_percentage`, average the boolean expression `rating < 3` (which evaluates to `0`/`1` per row) and multiply by `100` to get a percentage. Round both aggregates to two decimals.

## SQL Solution

```sql
SELECT query_name,
       ROUND(AVG(rating / position), 2) AS quality,
       ROUND(AVG(IF(rating < 3, 1, 0)) * 100, 2) AS poor_query_percentage
FROM Queries
GROUP BY query_name;
```

## Complexity

- **Time:** `O(n)` for the single grouped aggregation pass.
- **Space:** `O(n)` for the intermediate groups.
