# 3230. Customer Purchasing Behavior Analysis

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A database tracks customer transactions, each linked to a product with a category, an amount, and a transaction date. For each customer, compute their total spend, total number of transactions, number of unique product categories purchased, average transaction amount, their single "top" category (the one with the most transactions, breaking ties by most recent transaction date), and a computed loyalty score based on transaction count and spend.

### Schema
```sql
Create table If Not Exists Transactions (transaction_id int, customer_id int, product_id int, amount decimal(10,2), transaction_date date)
Create table If Not Exists Products (product_id int, category varchar(50))
```

## Approach
First, for each customer, rank their purchased categories by transaction count (descending) and, as a tiebreaker, by the most recent transaction date within that category (descending), assigning rank 1 to their top category. Then, aggregate per customer: total spend (rounded), transaction count, count of distinct categories purchased, average transaction amount (rounded), and join in the top-ranked category from the ranking step. Finally, compute a loyalty score as a weighted combination of transaction count and total spend, and order the final results by loyalty score descending, then by customer id.

## SQL Solution
```sql
WITH
  RankedCategoriesPerCustomer AS (
    SELECT
      Transactions.customer_id,
      Products.category,
      RANK() OVER(
        PARTITION BY Transactions.customer_id
        ORDER BY COUNT(Products.category) DESC,
          MAX(Transactions.transaction_date) DESC
      ) AS rnk
    FROM Transactions
    INNER JOIN Products
      ON Transactions.product_id = Products.product_id
    GROUP BY Transactions.customer_id, Products.category
  ),
  TransactionsMetadata AS (
    SELECT
      Transactions.customer_id,
      ROUND(SUM(Transactions.amount), 2) AS total_amount,
      COUNT(Transactions.transaction_id) AS transaction_count,
      COUNT(DISTINCT Products.category) AS unique_categories,
      ROUND(AVG(Transactions.amount), 2) AS avg_transaction_amount,
      RankedCategoriesPerCustomer.category AS top_category
    FROM Transactions
    INNER JOIN Products
      ON Transactions.product_id = Products.product_id
    INNER JOIN RankedCategoriesPerCustomer
      ON Transactions.customer_id = RankedCategoriesPerCustomer.customer_id
    WHERE RankedCategoriesPerCustomer.rnk = 1
    GROUP BY Transactions.customer_id, RankedCategoriesPerCustomer.category
  )
SELECT
  *,
  ROUND(transaction_count * 10 + total_amount / 100, 2) AS loyalty_score
FROM TransactionsMetadata
ORDER BY loyalty_score DESC, customer_id;
```

## Complexity
- Time: O(n log n) due to window function ranking and joins
- Space: O(n)
