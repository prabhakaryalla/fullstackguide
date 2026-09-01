# 2986. Find Third Transaction

**Difficulty:** Medium
**Category:** Array, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Transactions
+---------------+----------+
| Column Name   | Type     |
+---------------+----------+
| user_id       | int      |
| spend         | decimal  |
| transaction_date | date |
+---------------+----------+
(user_id, transaction_date) is the primary key.
```

For each user, find their third transaction's spending amount and date, ordered by transaction_date. If a user has less than 3 transactions, exclude them.

### Example

```
Input:
Transactions table:
+---------+--------+------------------+
| user_id | spend  | transaction_date |
+---------+--------+------------------+
| 1       | 65.56  | 2023-11-18       |
| 1       | 96.12  | 2023-11-30       |
| 1       | 7.44   | 2023-12-04       |
| 2       | 5.00   | 2023-11-10       |
+---------+--------+------------------+
Output:
+---------+------------------+--------+
| user_id | transaction_date | spend  |
+---------+------------------+--------+
| 1       | 2023-12-04       | 7.44   |
+---------+------------------+--------+
```

## Approach

Use window functions to rank transactions per user, then filter for rank = 3.

## SQL Solution

```sql
WITH RankedTransactions AS (
    SELECT 
        user_id,
        spend,
        transaction_date,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY transaction_date) AS rn
    FROM Transactions
)
SELECT user_id, transaction_date, spend
FROM RankedTransactions
WHERE rn = 3
ORDER BY user_id;
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
