# 2324. Product Sales Analysis IV

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to report the user who has the most purchases, and the product that has been purchased by the most users. If there is a tie, report all of them.

Return the result table in any order.

### Schema

```
Table: Sales
+-------------+------+
| Column Name | Type |
+-------------+------+
| sale_id     | int  |
| product_id  | int  |
| user_id     | int  |
| quantity    | int  |
+-------------+------+
sale_id is the primary key for this table.
product_id is a foreign key to Product table.
Each row contains the product bought, the user who bought it, and the quantity.
```

```
Table: Product
+-------------+------+
| Column Name | Type |
+-------------+------+
| product_id  | int  |
| price       | int  |
+-------------+------+
product_id is the primary key for this table.
Each row contains the ID and price of a product.
```

### Example

```
Input:
Sales table:
+---------+------------+---------+----------+
| sale_id | product_id | user_id | quantity |
+---------+------------+---------+----------+
| 1       | 1          | 101     | 10       |
| 2       | 2          | 101     | 1        |
| 3       | 3          | 102     | 3        |
| 4       | 3          | 102     | 2        |
| 5       | 2          | 103     | 3        |
+---------+------------+---------+----------+

Output:
+---------+------------+
| user_id | product_id |
+---------+------------+
| 101     | 3          |
+---------+------------+
```

## Approach

1. Count the number of purchases (distinct sale_id or total purchases) per user
2. Count the number of distinct users per product
3. Find the maximum count for each
4. Return users with max purchases and products with max distinct users

Use window functions or subqueries to identify the maximums and filter.

## SQL Solution

```sql
WITH UserPurchases AS (
    SELECT 
        user_id,
        COUNT(*) AS purchase_count,
        RANK() OVER (ORDER BY COUNT(*) DESC) AS user_rank
    FROM Sales
    GROUP BY user_id
),
ProductPopularity AS (
    SELECT 
        product_id,
        COUNT(DISTINCT user_id) AS user_count,
        RANK() OVER (ORDER BY COUNT(DISTINCT user_id) DESC) AS product_rank
    FROM Sales
    GROUP BY product_id
)
SELECT 
    up.user_id,
    pp.product_id
FROM UserPurchases up
CROSS JOIN ProductPopularity pp
WHERE up.user_rank = 1 AND pp.product_rank = 1
```

## Complexity

- **Time:** O(n log n) for grouping and ranking
- **Space:** O(n) for CTEs
