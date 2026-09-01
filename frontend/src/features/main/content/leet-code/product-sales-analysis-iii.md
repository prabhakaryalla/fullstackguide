# 1070. Product Sales Analysis III

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given a `Sales` table (`sale_id`, `product_id`, `year`, `quantity`, `price`), write a query that reports, for each product, the `product_id`, the first year it was sold (`first_year`), and the `quantity` and `price` for that first year's sale.

### Schema

```
Sales: sale_id, product_id, year, quantity, price
```

## Approach

First determine each product's earliest sale year with a grouped subquery (`MIN(year)` per `product_id`). Then filter the original `Sales` rows down to only those whose `(product_id, year)` pair matches one of those earliest years, and report that row's quantity and price alongside the year, renamed as `first_year`.

## SQL Solution

```sql
SELECT product_id, year AS first_year, quantity, price
FROM Sales
WHERE (product_id, year) IN (
    SELECT product_id, MIN(year)
    FROM Sales
    GROUP BY product_id
);
```

## Complexity

- **Time:** `O(n)` for the grouping subquery plus a filtering scan.
- **Space:** `O(products)` for the intermediate first-year results.
