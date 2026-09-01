# 2922. Market Analysis III

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write an SQL query to find sellers who have sold items in both categories 'Books' and 'Electronics'. For each qualifying seller, return their seller_id and the total number of distinct items they've sold.

### Schema

```
Users table:
+----------+----------+
| user_id  | join_date|
+----------+----------+

Orders table:
+----------+---------+-----------+---------+
| order_id | user_id | item_id   | order_date|
+----------+---------+-----------+---------+

Items table:
+---------+----------+----------+
| item_id | category | item_name|
+---------+----------+----------+
```

## Approach

Join Orders with Items to get categories. Group by user_id and filter users who have sold in both 'Books' and 'Electronics' categories using HAVING with conditional aggregation. Count distinct items per user.

## SQL Solution

```sql
SELECT 
    o.user_id AS seller_id,
    COUNT(DISTINCT o.item_id) AS num_items
FROM Orders o
JOIN Items i ON o.item_id = i.item_id
GROUP BY o.user_id
HAVING 
    SUM(CASE WHEN i.category = 'Books' THEN 1 ELSE 0 END) > 0
    AND SUM(CASE WHEN i.category = 'Electronics' THEN 1 ELSE 0 END) > 0
ORDER BY seller_id;
```

## Complexity

- **Time:** O(n * m) where n is orders, m is items
- **Space:** O(n) for grouping
