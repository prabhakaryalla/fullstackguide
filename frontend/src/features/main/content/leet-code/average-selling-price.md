# 1251. Average Selling Price

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Prices` table (`product_id`, `start_date`, `end_date`, `price`) describing price periods, and a `UnitsSold` table (`product_id`, `purchase_date`, `units`), compute for each product the average selling price, defined as total revenue divided by total units sold, rounded to two decimals. Report `0` for products with no recorded sales.

### Schema

```
Prices: product_id, start_date, end_date, price
UnitsSold: product_id, purchase_date, units
```

## Approach

Left join `Prices` to `UnitsSold` on matching `product_id` where the sale's `purchase_date` falls within that price period's `[start_date, end_date]` range, so each sale is attributed to the price that was active when it happened. Sum `price * units` for revenue and `units` for the denominator per product, then divide; `IFNULL` covers products with no matching sales by outputting `0` instead of a division-by-zero null.

## SQL Solution

```sql
SELECT p.product_id,
       ROUND(IFNULL(SUM(p.price * u.units) / SUM(u.units), 0), 2) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
    ON p.product_id = u.product_id
   AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;
```

## Complexity

- **Time:** `O(n log n)` for the join and grouping.
- **Space:** `O(n)` for the joined intermediate rows.
