# 2701. Consecutive Transactions with Increasing Amounts

**Difficulty:** Hard
**Category:** Database, SQL
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```
Table: Transactions
+-------------------+------+
| Column Name       | Type |
+-------------------+------+
| transaction_id    | int  |
| customer_id       | int  |
| transaction_date  | date |
| amount            | int  |
+-------------------+------+
transaction_id is the primary key. Each (customer_id, transaction_date) pair is unique.
```

For each customer, find their longest streak of at least 3 consecutive calendar days of transactions in which each day's transaction date is exactly one day after the previous one, **and** the transaction amount strictly increases from one day to the next. Report `customer_id`, the streak's `consecutive_start` date, and `consecutive_end` date (choosing the longest streak per customer, breaking ties by the earliest start date). Order the result by `customer_id`.

## Approach

This is a classic "gaps and islands" problem with an extra amount-increasing condition. Using window functions, compare each row's date and amount to the immediately preceding row (by `customer_id`, ordered by `transaction_date`) with `LAG`. Flag a row as starting a new group whenever the date isn't exactly one day later than the previous row's date, or the amount didn't strictly increase. A running `SUM` of these flags produces a group id per customer; grouping by `(customer_id, group id)` and filtering for groups with at least 3 rows yields all qualifying streaks, from which we keep only the longest (and earliest, on ties) streak per customer.

## SQL Solution

```sql
WITH ordered AS (
  SELECT
    customer_id,
    transaction_date,
    amount,
    CASE
      WHEN DATEDIFF(
             transaction_date,
             LAG(transaction_date) OVER (PARTITION BY customer_id ORDER BY transaction_date)
           ) = 1
       AND amount > LAG(amount) OVER (PARTITION BY customer_id ORDER BY transaction_date)
      THEN 0
      ELSE 1
    END AS is_new_group
  FROM Transactions
),
grouped AS (
  SELECT
    customer_id,
    transaction_date,
    SUM(is_new_group) OVER (PARTITION BY customer_id ORDER BY transaction_date) AS grp
  FROM ordered
),
streaks AS (
  SELECT
    customer_id,
    grp,
    MIN(transaction_date) AS consecutive_start,
    MAX(transaction_date) AS consecutive_end,
    COUNT(*) AS streak_len
  FROM grouped
  GROUP BY customer_id, grp
  HAVING COUNT(*) >= 3
),
ranked AS (
  SELECT
    customer_id,
    consecutive_start,
    consecutive_end,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY streak_len DESC, consecutive_start ASC
    ) AS rn
  FROM streaks
)
SELECT customer_id, consecutive_start, consecutive_end
FROM ranked
WHERE rn = 1
ORDER BY customer_id;
```

## Complexity

- **Time:** O(n log n) for the window-function sorts/partitions over n transactions.
- **Space:** O(n) for the intermediate CTE results.
