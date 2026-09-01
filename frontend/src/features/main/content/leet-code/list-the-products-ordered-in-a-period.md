# 1327. List the Products Ordered in a Period

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Products` (`product_id`, `product_name`, `product_category`) and `Orders` (`product_id`, `order_date`, `unit`), write a query that reports the `product_name` and total `unit` ordered in February 2020, for products with at least 100 units ordered that month.

### Schema

```
Products: product_id (PK), product_name, product_category
Orders: product_id, order_date, unit
```

## Approach

Join the two tables on `product_id`, filter `Orders` down to rows dated in February 2020, group by product, and keep only the groups whose summed `unit` reaches the 100-unit threshold.

## SQL Solution

```sql
SELECT p.product_name, SUM(o.unit) AS unit
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date >= '2020-02-01' AND o.order_date < '2020-03-01'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;
```

## Complexity

- **Time:** `O(n)` for the join and aggregation.
- **Space:** `O(distinct product_id)` for the grouped result.
