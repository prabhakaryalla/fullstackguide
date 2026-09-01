# 3220. Odd and Even Transactions

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table records financial transactions, each with an amount and a date. For each distinct transaction date, compute the sum of transaction amounts that are odd numbers, and separately the sum of transaction amounts that are even numbers.

### Schema
```sql
Create table If Not Exists Transactions (transaction_id int, amount int, transaction_date date)
```

## Approach
Group all transactions by their transaction date. Within each group, sum the amounts that are odd (checking `amount % 2 = 1`) into one aggregate, and sum the amounts that are even into a separate aggregate, using conditional sums.

## SQL Solution
```sql
SELECT
  transaction_date,
  SUM(CASE WHEN amount % 2 = 1 THEN amount ELSE 0 END) AS odd_sum,
  SUM(CASE WHEN amount % 2 = 0 THEN amount ELSE 0 END) AS even_sum
FROM Transactions
GROUP BY transaction_date
ORDER BY transaction_date;
```

## Complexity
- Time: O(n log n) due to grouping
- Space: O(n)
