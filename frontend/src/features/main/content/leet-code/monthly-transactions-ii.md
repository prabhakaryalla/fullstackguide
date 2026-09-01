# 1205. Monthly Transactions II

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Transactions` table (`id`, `country`, `state` [`approved`/`declined`], `amount`, `trans_date`) and a `Chargebacks` table (`trans_id`, `trans_date`), report for every `(month, country)` combination that has any activity: the count and total amount of approved transactions, and the count and total amount of chargebacks (a chargeback is attributed to the month it occurred in, not the original transaction's month).

### Schema

```
Transactions: id (PK), country, state, amount, trans_date
Chargebacks: trans_id (FK), trans_date
```

## Approach

Build two separate aggregates: approved transactions grouped by their own month/country, and chargebacks joined back to `Transactions` (to recover the country) grouped by the chargeback's month/country. Combine both aggregates with `UNION ALL`, then group again by `(month, country)` and sum each metric — rows that only appear in one side naturally contribute zero to the other's totals.

## SQL Solution

```sql
SELECT month, country,
    SUM(approved_count) AS approved_count,
    SUM(approved_amount) AS approved_amount,
    SUM(chargeback_count) AS chargeback_count,
    SUM(chargeback_amount) AS chargeback_amount
FROM (
    SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month, country,
           COUNT(*) AS approved_count, SUM(amount) AS approved_amount,
           0 AS chargeback_count, 0 AS chargeback_amount
    FROM Transactions
    WHERE state = 'approved'
    GROUP BY month, country

    UNION ALL

    SELECT DATE_FORMAT(c.trans_date, '%Y-%m') AS month, t.country,
           0 AS approved_count, 0 AS approved_amount,
           COUNT(*) AS chargeback_count, SUM(t.amount) AS chargeback_amount
    FROM Chargebacks c
    JOIN Transactions t ON c.trans_id = t.id
    GROUP BY month, t.country
) AS combined
GROUP BY month, country;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and join operations.
- **Space:** `O(n)` for the intermediate aggregates.
