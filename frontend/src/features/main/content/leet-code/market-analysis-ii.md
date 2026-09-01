# 1159. Market Analysis II

**Difficulty:** Hard
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given `Users` (`user_id`, `join_date`, `favorite_brand`), `Orders` (`order_id`, `order_date`, `item_id`, `buyer_id`, `seller_id`), and `Items` (`item_id`, `item_brand`), determine for each user whether the second item they ever sold (ordered by `order_date`) belongs to their `favorite_brand`.

### Schema

```
Users: user_id, join_date, favorite_brand
Orders: order_id, order_date, item_id, buyer_id, seller_id
Items: item_id, item_brand
```

## Approach

Rank each seller's orders by date using `ROW_NUMBER()` partitioned by `seller_id`, then keep only the rows ranked second. Join that "second sale" to `Items` to find its brand, and left join back to `Users` so that sellers with fewer than two sales still appear with a `no` result.

## SQL Solution

```sql
WITH SellerOrders AS (
    SELECT o.seller_id, o.item_id, o.order_date,
           ROW_NUMBER() OVER (PARTITION BY o.seller_id ORDER BY o.order_date) AS rn
    FROM Orders o
),
SecondOrders AS (
    SELECT so.seller_id, i.item_brand
    FROM SellerOrders so
    JOIN Items i ON so.item_id = i.item_id
    WHERE so.rn = 2
)
SELECT u.user_id AS seller_id,
       CASE WHEN s.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS `2nd_item_fav_brand`
FROM Users u
LEFT JOIN SecondOrders s ON u.user_id = s.seller_id;
```

## Complexity

- **Time:** `O(n log n)` for the partitioned ranking.
- **Space:** `O(n)` for the intermediate ranked table.
