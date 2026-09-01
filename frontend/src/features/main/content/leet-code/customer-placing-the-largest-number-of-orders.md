# 586. Customer Placing the Largest Number of Orders

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given an `Orders` table (`order_number`, `customer_number`), write a query to report the `customer_number` for the customer who has placed the largest number of orders.

### Schema

```
Orders: order_number (PK), customer_number
```

## Approach

Group all orders by `customer_number`, count the orders in each group, and sort those counts in descending order to bring the customer with the most orders to the top; take just that first result.

## SQL Solution

```sql
SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;
```

## Complexity

- **Time:** `O(n log n)` for the sort, where `n` is the number of distinct customers.
- **Space:** `O(n)` for the grouped intermediate result.
