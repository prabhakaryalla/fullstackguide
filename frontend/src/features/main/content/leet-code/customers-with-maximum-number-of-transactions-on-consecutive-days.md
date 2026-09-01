# 2752. Customers With Maximum Number of Transactions on Consecutive Days

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to find customers who made transactions on the maximum number of consecutive days. Return the customer IDs.

### Schema

```sql
Table: Transactions
+----------------+------+
| Column Name    | Type |
+----------------+------+
| transaction_id | int  |
| customer_id    | int  |
| transaction_date | date |
| amount         | int  |
+----------------+------+
transaction_id is the primary key.
```

### Example

```
Input:
Transactions table:
+----------------+-------------+------------------+--------+
| transaction_id | customer_id | transaction_date | amount |
+----------------+-------------+------------------+--------+
| 1              | 1           | 2023-01-01       | 100    |
| 2              | 1           | 2023-01-02       | 200    |
| 3              | 1           | 2023-01-03       | 150    |
| 4              | 2           | 2023-01-01       | 300    |
| 5              | 2           | 2023-01-03       | 250    |
+----------------+-------------+------------------+--------+
Output:
+-------------+
| customer_id |
+-------------+
| 1           |
+-------------+
Explanation: Customer 1 has 3 consecutive days of transactions.
```

## Approach

Use window functions to identify consecutive transaction dates for each customer. Calculate the difference between transaction_date and a row_number-based ranking to group consecutive sequences. Count the length of each sequence and find the maximum.

## SQL Solution

```sql
WITH RankedTransactions AS (
    SELECT 
        customer_id,
        transaction_date,
        DATE_SUB(transaction_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date) DAY) AS grp
    FROM (
        SELECT DISTINCT customer_id, transaction_date
        FROM Transactions
    ) t
),
ConsecutiveCounts AS (
    SELECT 
        customer_id,
        COUNT(*) AS consecutive_days
    FROM RankedTransactions
    GROUP BY customer_id, grp
),
MaxConsecutive AS (
    SELECT MAX(consecutive_days) AS max_days
    FROM ConsecutiveCounts
)
SELECT DISTINCT cc.customer_id
FROM ConsecutiveCounts cc, MaxConsecutive mc
WHERE cc.consecutive_days = mc.max_days
ORDER BY cc.customer_id;
```

## Complexity

- **Time:** O(n log n) for sorting and window functions
- **Space:** O(n) for intermediate results
