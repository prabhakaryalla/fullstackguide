# 1193. Monthly Transactions I

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Transactions` table (`id`, `country`, `state`, `amount`, `trans_date`), report for each month and country: the total number of transactions, how many were `approved`, the total transaction amount, and the total approved amount.

### Schema

```
Transactions: id, country, state, amount, trans_date
```

## Approach

Extract the year-month from `trans_date` and group by that month plus `country`. Within each group, count all rows for the transaction count, and use conditional sums (`CASE WHEN state = 'approved'`) to isolate the approved-only count and amount.

## SQL Solution

```sql
SELECT
    DATE_FORMAT(trans_date, '%Y-%m') AS month,
    country,
    COUNT(*) AS trans_count,
    SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(amount) AS trans_total_amount,
    SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country;
```

## Complexity

- **Time:** `O(n log n)` for the grouping.
- **Space:** `O(n)` for the grouped result.
