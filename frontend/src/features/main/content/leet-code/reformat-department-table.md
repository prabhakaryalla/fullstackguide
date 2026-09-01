# 1179. Reformat Department Table

**Difficulty:** Easy
**Category:** SQL, Database, Pivot

## Problem

Given a `Department` table (`id`, `revenue`, `month`) storing one row per department per month, reformat it into a single row per department with a separate column for each month's revenue (`Jan_Revenue`, `Feb_Revenue`, ..., `Dec_Revenue`), using `null` where a department has no record for that month.

### Schema

```
Department: id, revenue, month
```

## Approach

Group the rows by `id` and use a conditional aggregate (`SUM` combined with `CASE WHEN`) for each month to "pivot" the month values into their own columns — each `CASE` expression only contributes a value when the row's `month` matches, and `SUM` collapses each department's single matching row (or stays `NULL` if there isn't one) into that column.

## SQL Solution

```sql
SELECT
    id,
    SUM(CASE WHEN month = 'Jan' THEN revenue END) AS Jan_Revenue,
    SUM(CASE WHEN month = 'Feb' THEN revenue END) AS Feb_Revenue,
    SUM(CASE WHEN month = 'Mar' THEN revenue END) AS Mar_Revenue,
    SUM(CASE WHEN month = 'Apr' THEN revenue END) AS Apr_Revenue,
    SUM(CASE WHEN month = 'May' THEN revenue END) AS May_Revenue,
    SUM(CASE WHEN month = 'Jun' THEN revenue END) AS Jun_Revenue,
    SUM(CASE WHEN month = 'Jul' THEN revenue END) AS Jul_Revenue,
    SUM(CASE WHEN month = 'Aug' THEN revenue END) AS Aug_Revenue,
    SUM(CASE WHEN month = 'Sep' THEN revenue END) AS Sep_Revenue,
    SUM(CASE WHEN month = 'Oct' THEN revenue END) AS Oct_Revenue,
    SUM(CASE WHEN month = 'Nov' THEN revenue END) AS Nov_Revenue,
    SUM(CASE WHEN month = 'Dec' THEN revenue END) AS Dec_Revenue
FROM Department
GROUP BY id;
```

## Complexity

- **Time:** `O(n)` for the grouped aggregation.
- **Space:** `O(distinct department ids)` for the result.
