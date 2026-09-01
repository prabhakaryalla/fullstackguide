# 1083. Sales Analysis II

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Product` table (`product_id`, `product_name`) and a `Sales` table (`seller_id`, `product_id`, `buyer_id`, `sale_date`, `quantity`, `price`), write a query to report the buyer IDs who bought an "S8" phone but did not buy an "iPhone".

### Schema

```
Product: product_id (PK), product_name
Sales: seller_id, product_id (FK), buyer_id, sale_date, quantity, price
```

## Approach

Join `Sales` to `Product` to find every buyer who purchased an "S8". Then exclude any buyer who appears in a similarly-joined subquery for "iPhone" purchases, using `NOT IN`. Deduplicate with `DISTINCT` since a buyer could have bought multiple S8 units.

## SQL Solution

```sql
SELECT DISTINCT s.buyer_id
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
WHERE p.product_name = 'S8'
AND s.buyer_id NOT IN (
    SELECT s2.buyer_id
    FROM Sales s2
    JOIN Product p2 ON s2.product_id = p2.product_id
    WHERE p2.product_name = 'iPhone'
);
```

## Complexity

- **Time:** `O(n)` for the joins and subquery scan.
- **Space:** `O(buyers)` for the intermediate iPhone-buyer set.
