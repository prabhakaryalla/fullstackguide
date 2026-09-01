# 1045. Customers Who Bought All Products

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given a `Customer` table (`customer_id`, `product_key`) recording which products each customer bought, and a `Product` table (`product_key`) listing all distinct products, write a query to find the customer IDs who bought every single product.

### Schema

```
Customer: customer_id, product_key
Product: product_key (PK)
```

## Approach

Group purchases by `customer_id` and count how many **distinct** products each customer bought. A customer qualifies only if that distinct count equals the total number of products available, which is computed once via a subquery on `Product`.

## SQL Solution

```sql
SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);
```

## Complexity

- **Time:** `O(n)` for the grouping scan, where `n` is the number of purchase rows.
- **Space:** `O(customers)` for the grouped result.
