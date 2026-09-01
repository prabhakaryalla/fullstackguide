# 2329. Product Sales Analysis V

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Sales(sale_id, product_id, user_id, quantity)` and table `Product(product_id, price)`. For each user who made at least one purchase, compute their total spending as the sum of `quantity * price` across all of their sales. Return `user_id` and `spending` for every such user, ordered by spending descending (ties broken by `user_id` ascending).

### Schema

```
Sales: sale_id (PK), product_id, user_id, quantity
Product: product_id (PK), price
```

## Approach

Join `Sales` to `Product` on `product_id`, group by `user_id`, and sum `quantity * price`. Order the result by spending descending, then `user_id` ascending for ties.

## SQL Solution

```sql
SELECT
    Sales.user_id,
    SUM(Sales.quantity * Product.price) AS spending
FROM Sales
JOIN Product
    ON Sales.product_id = Product.product_id
GROUP BY Sales.user_id
ORDER BY spending DESC, Sales.user_id ASC;
```

## Complexity

- **Time:** O(n log n) for the join, grouping, and sort
- **Space:** O(n)
