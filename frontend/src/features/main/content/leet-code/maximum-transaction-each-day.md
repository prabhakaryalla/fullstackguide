# 1831. Maximum Transaction Each Day

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Transactions` table (`transaction_id`, `day`, `amount`), find the ids of the transactions with the maximum `amount` on each calendar day, ordered by `transaction_id` ascending.

### Schema

```
Transactions: transaction_id, day, amount
```

## Approach

Use `RANK()` partitioned by the transaction's calendar day (`DATE(day)`) and ordered by `amount` descending, so every transaction tied for the largest amount on its day gets rank `1`. Filter to rank `1` and sort by `transaction_id`.

## SQL Solution

```sql
WITH RankedTransactions AS (
    SELECT
        transaction_id,
        RANK() OVER (PARTITION BY DATE(day) ORDER BY amount DESC) AS amount_rank
    FROM Transactions
)
SELECT transaction_id
FROM RankedTransactions
WHERE amount_rank = 1
ORDER BY transaction_id;
```

## Complexity

- **Time:** `O(n log n)` for the per-day ranking.
- **Space:** `O(n)` for the intermediate ranked set.
