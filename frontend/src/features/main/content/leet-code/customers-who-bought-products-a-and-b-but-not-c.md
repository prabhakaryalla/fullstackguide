# 1398. Customers Who Bought Products A and B but Not C

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Customers` (`customer_id`, `customer_name`) and `Orders` (`order_id`, `customer_id`, `product_name`), write a query that reports the customers who ordered product `"A"`, also ordered product `"B"`, but never ordered product `"C"`, sorted by `customer_id`.

### Schema

```
Customers: customer_id (PK), customer_name
Orders: order_id (PK), customer_id, product_name
```

## Approach

Filter customer ids down to those with at least one order for `"A"` and at least one order for `"B"`, then exclude any customer id that has any order for `"C"`, using three membership subqueries against `Orders`.

## SQL Solution

```sql
SELECT customer_id, customer_name
FROM Customers
WHERE customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'A')
  AND customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'B')
  AND customer_id NOT IN (SELECT customer_id FROM Orders WHERE product_name = 'C')
ORDER BY customer_id;
```

## Complexity

- **Time:** `O(n)` for the membership checks.
- **Space:** `O(n)` for the intermediate id sets.
