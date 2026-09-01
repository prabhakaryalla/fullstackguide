# 1158. Market Analysis I

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Users` table (`user_id`, `join_date`, `favorite_brand`) and an `Orders` table (`order_id`, `order_date`, `item_id`, `buyer_id`, `seller_id`), find, for every user, their `join_date` and the number of orders they made as a buyer in the year `2019`.

### Schema

```
Users: user_id, join_date, favorite_brand
Orders: order_id, order_date, item_id, buyer_id, seller_id
```

## Approach

Left join `Users` to `Orders` on `buyer_id`, restricting the joined `Orders` rows to those placed in `2019` so that users with no 2019 orders still appear with a count of zero. Group by user to count the orders per buyer.

## SQL Solution

```sql
SELECT u.user_id AS buyer_id, u.join_date,
       COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o
    ON u.user_id = o.buyer_id AND YEAR(o.order_date) = 2019
GROUP BY u.user_id, u.join_date;
```

## Complexity

- **Time:** `O(n + m)` for the join and grouping.
- **Space:** `O(n)` for the result set.
