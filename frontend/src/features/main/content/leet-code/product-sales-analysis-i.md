# 1068. Product Sales Analysis I

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Sales` table (`sale_id`, `product_id`, `year`, `quantity`, `price`) and a `Product` table (`product_id`, `product_name`), write a query to report the `product_name`, `year`, and `price` for each sale.

### Schema

```
Sales: sale_id, product_id (FK), year, quantity, price
Product: product_id (PK), product_name
```

## Approach

Each sale references a `product_id`, so joining `Sales` to `Product` on that key attaches the product's name to every sale row, alongside the sale's own `year` and `price` columns.

## SQL Solution

```sql
SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p ON s.product_id = p.product_id;
```

## Complexity

- **Time:** `O(n)` for the join, with an index on `product_id`.
- **Space:** `O(n)` for the result set.
