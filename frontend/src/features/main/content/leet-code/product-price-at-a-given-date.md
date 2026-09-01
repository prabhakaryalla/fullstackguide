# 1164. Product Price at a Given Date

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Products` table (`product_id`, `new_price`, `change_date`) recording every price change, find the price of every product on `2019-08-16`. A product whose price never changed before that date has a default price of `10`.

### Schema

```
Products: product_id, new_price, change_date
```

## Approach

For each product, find the most recent `change_date` on or before the target date, and use the `new_price` recorded at that change. Left-join every distinct product against that "most recent applicable change" so that products with no qualifying change fall back to the default price of `10`.

## SQL Solution

```sql
SELECT p.product_id, IFNULL(latest.new_price, 10) AS price
FROM (SELECT DISTINCT product_id FROM Products) p
LEFT JOIN (
    SELECT product_id, new_price
    FROM Products
    WHERE (product_id, change_date) IN (
        SELECT product_id, MAX(change_date)
        FROM Products
        WHERE change_date <= '2019-08-16'
        GROUP BY product_id
    )
) latest ON p.product_id = latest.product_id;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and join.
- **Space:** `O(n)` for the intermediate latest-price table.
