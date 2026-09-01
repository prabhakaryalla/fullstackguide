# 1795. Rearrange Products Table

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Products` table (`product_id`, `store1`, `store2`, `store3`) where each store column holds a price or is `null` if not sold there, reshape the data into one row per `(product_id, store, price)` combination, excluding stores where the product isn't sold.

### Schema

```
Products: product_id, store1, store2, store3
```

## Approach

Unpivot each store column into its own set of rows using `UNION ALL`, filtering out `null` prices in each branch.

## SQL Solution

```sql
SELECT product_id, 'store1' AS store, store1 AS price FROM Products WHERE store1 IS NOT NULL
UNION ALL
SELECT product_id, 'store2' AS store, store2 AS price FROM Products WHERE store2 IS NOT NULL
UNION ALL
SELECT product_id, 'store3' AS store, store3 AS price FROM Products WHERE store3 IS NOT NULL;
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
