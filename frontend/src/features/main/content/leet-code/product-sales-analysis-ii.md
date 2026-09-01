# 1069. Product Sales Analysis II

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Sales` table (`sale_id`, `product_id`, `year`, `quantity`, `price`), write a query to report the total quantity sold for each product.

### Schema

```
Sales: sale_id, product_id, year, quantity, price
```

## Approach

Group all sale rows by `product_id` and sum their `quantity` values to get the total units sold per product.

## SQL Solution

```sql
SELECT product_id, SUM(quantity) AS total_quantity
FROM Sales
GROUP BY product_id;
```

## Complexity

- **Time:** `O(n)` for the grouping scan.
- **Space:** `O(products)` for the grouped result.
