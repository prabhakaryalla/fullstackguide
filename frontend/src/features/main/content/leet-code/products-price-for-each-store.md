# 1777. Product's Price for Each Store

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Products` table (`product_id`, `store`, `price`) where `store` is one of `store1`, `store2`, `store3`, pivot the data so each product has one row with its price in each store (or `null` if not sold there).

### Schema

```
Products: product_id, store, price
```

## Approach

Group by `product_id` and use conditional aggregation (`MAX(CASE WHEN ...)`) to pivot each store's price into its own column.

## SQL Solution

```sql
SELECT
    product_id,
    MAX(CASE WHEN store = 'store1' THEN price END) AS store1,
    MAX(CASE WHEN store = 'store2' THEN price END) AS store2,
    MAX(CASE WHEN store = 'store3' THEN price END) AS store3
FROM Products
GROUP BY product_id;
```

## Complexity

- **Time:** `O(n log n)` for the grouping.
- **Space:** `O(n)`.
