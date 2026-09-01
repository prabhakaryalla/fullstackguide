# 2292. Products With Three or More Orders in Two Consecutive Years

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to report the products that have at least three orders in two consecutive years. Return the result table in any order.

### Schema

```
Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| product_id    | int     |
| quantity      | int     |
| purchase_date | date    |
+---------------+---------+
order_id is the primary key for this table.
Each row contains the ID of an order, the ID of product purchased, the quantity, and the purchase date.
```

### Example

```
Input:
Orders table:
+----------+------------+----------+---------------+
| order_id | product_id | quantity | purchase_date |
+----------+------------+----------+---------------+
| 1        | 1          | 7        | 2020-03-16    |
| 2        | 1          | 4        | 2020-12-02    |
| 3        | 1          | 7        | 2020-05-10    |
| 4        | 1          | 6        | 2021-12-23    |
| 5        | 1          | 5        | 2021-05-21    |
| 6        | 1          | 6        | 2021-10-11    |
| 7        | 2          | 6        | 2022-10-11    |
+----------+------------+----------+---------------+

Output:
+------------+
| product_id |
+------------+
| 1          |
+------------+
```

## Approach

1. Extract the year from purchase_date
2. Count distinct orders per product per year
3. Identify products with at least 3 orders in a given year
4. Check for products that appear in two consecutive years

Use a self-join to find consecutive years with the required order counts.

## SQL Solution

```sql
WITH YearlyOrders AS (
    SELECT 
        product_id,
        YEAR(purchase_date) AS order_year,
        COUNT(DISTINCT order_id) AS order_count
    FROM Orders
    GROUP BY product_id, YEAR(purchase_date)
    HAVING COUNT(DISTINCT order_id) >= 3
)
SELECT DISTINCT y1.product_id
FROM YearlyOrders y1
JOIN YearlyOrders y2
    ON y1.product_id = y2.product_id
    AND y2.order_year = y1.order_year + 1
ORDER BY y1.product_id
```

## Complexity

- **Time:** O(n log n) for grouping and joining
- **Space:** O(n) for the CTE
