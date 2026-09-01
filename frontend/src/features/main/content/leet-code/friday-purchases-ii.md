# 2994. Friday Purchases II

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find the total amount spent on each Friday of every week in November 2023. Unlike the easier version, the result must include **all five** weeks of the month, reporting a total of `0` for any week that has no Friday purchases. Order the result by `week_of_month`.

### Schema

```
Purchases table:
+----------------+------+
| Column Name    | Type |
+----------------+------+
| user_id        | int  |
| purchase_date  | date |
| amount_spend   | int  |
+----------------+------+
(user_id, purchase_date) is not guaranteed to be unique; there can be multiple purchases per user per day.
```

## Approach

Because some weeks may have no matching purchases at all, first generate a reference set of the five possible `week_of_month` values (`1` through `5`) using a recursive CTE, then `LEFT JOIN` it against the filtered Friday purchases of November 2023 (matched by `CEIL(DAYOFMONTH(purchase_date) / 7)`), summing with `COALESCE(..., 0)` to turn missing matches into zero totals.

## SQL Solution

```sql
WITH RECURSIVE weeks AS (
    SELECT 1 AS week_of_month
    UNION ALL
    SELECT week_of_month + 1 FROM weeks WHERE week_of_month < 5
)
SELECT
    w.week_of_month,
    COALESCE(SUM(p.amount_spend), 0) AS total_amount
FROM weeks w
LEFT JOIN Purchases p
    ON CEIL(DAYOFMONTH(p.purchase_date) / 7) = w.week_of_month
    AND YEAR(p.purchase_date) = 2023
    AND MONTH(p.purchase_date) = 11
    AND DAYOFWEEK(p.purchase_date) = 6
GROUP BY w.week_of_month
ORDER BY w.week_of_month;
```

## Complexity

- **Time:** O(n) for scanning purchases plus O(1) for the fixed 5-row weeks CTE
- **Space:** O(n) for the join/grouping
