# 2993. Friday Purchases I

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find the sum of amount spent on each Friday of every week in November 2023. Report the week of the month (`1` to `5`, computed as `CEIL(day_of_month / 7)`), the exact purchase date, and the total amount spent on that date. Only include Fridays that actually have at least one purchase. Order the result by `purchase_date`.

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

Filter rows to November 2023 and keep only Fridays. Group by the exact `purchase_date` (since each Friday date should be reported separately), summing `amount_spend`, and derive `week_of_month` from the day-of-month using `CEIL(day / 7)`. Finally order by `purchase_date`.

## SQL Solution

```sql
SELECT
    CEIL(DAYOFMONTH(purchase_date) / 7) AS week_of_month,
    purchase_date,
    SUM(amount_spend) AS total_amount
FROM Purchases
WHERE YEAR(purchase_date) = 2023
    AND MONTH(purchase_date) = 11
    AND DAYOFWEEK(purchase_date) = 6
GROUP BY purchase_date
ORDER BY purchase_date;
```

## Complexity

- **Time:** O(n log n) for the grouping/sort, where n is the number of purchase rows
- **Space:** O(n) for the grouped result
