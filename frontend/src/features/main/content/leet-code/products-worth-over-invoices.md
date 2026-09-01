# 1677. Product's Worth Over Invoices

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Product` (`product_id`, `name`, `price`) and `Invoice` (`invoice_id`, `product_id`, `rest`, `paid`, `canceled`, `refunded`), report for each product its name along with the total `rest`, `paid`, `canceled`, and `refunded` amounts summed across all of its invoices, defaulting each to `0` for products with no invoices.

### Schema

```
Product: product_id (PK), name, price
Invoice: invoice_id (PK), product_id, rest, paid, canceled, refunded
```

## Approach

Left join `Product` to `Invoice` so products without any invoices are still included, group by product, and sum each monetary column, wrapping each in `IFNULL` to coalesce `NULL` sums (from products with no matching invoices) to `0`.

## SQL Solution

```sql
SELECT
    p.name,
    IFNULL(SUM(i.rest), 0) AS rest,
    IFNULL(SUM(i.paid), 0) AS paid,
    IFNULL(SUM(i.canceled), 0) AS canceled,
    IFNULL(SUM(i.refunded), 0) AS refunded
FROM Product p
LEFT JOIN Invoice i ON p.product_id = i.product_id
GROUP BY p.product_id, p.name
ORDER BY p.name;
```

## Complexity

- **Time:** `O(p + i)`, where `p` is the number of products and `i` the number of invoices.
- **Space:** `O(p)` for the result set.
