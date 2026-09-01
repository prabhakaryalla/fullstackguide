# 2362. Generate the Invoice

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to generate invoices. An invoice should be generated for the pair of `customer_id` and `product_id` that has the highest total price among all pairs. If there are multiple pairs with the same maximum total price, return all of them.

The total price for a pair is the sum of `price * quantity` for all purchases of that product by that customer.

Return the result table in any order.

### Schema

```
Table: Purchases
+-------------+------+
| Column Name | Type |
+-------------+------+
| invoice_id  | int  |
| product_id  | int  |
| quantity    | int  |
| price       | int  |
+-------------+------+
invoice_id is the primary key for this table.
Each row represents a purchase: product, quantity, and price.
```

```
Table: Products
+-------------+------+
| Column Name | Type |
+-------------+------+
| product_id  | int  |
| name        | varchar |
+-------------+------+
product_id is the primary key for this table.
```

### Example

```
Input:
Purchases table:
+------------+------------+----------+-------+
| invoice_id | product_id | quantity | price |
+------------+------------+----------+-------+
| 1          | 1          | 3        | 10    |
| 2          | 1          | 1        | 12    |
| 3          | 2          | 2        | 8     |
+------------+------------+----------+-------+

Output:
+------------+------------+-------+
| product_id | name       | total |
+------------+------------+-------+
| 1          | ProductA   | 42    |
+------------+------------+-------+
```

## Approach

1. Calculate total price for each (customer_id, product_id) pair
2. Find the maximum total price
3. Return all pairs with that maximum price
4. Join with Products table to get product names

## SQL Solution

```sql
WITH TotalPrices AS (
    SELECT 
        product_id,
        SUM(quantity * price) AS total
    FROM Purchases
    GROUP BY product_id
),
MaxTotal AS (
    SELECT MAX(total) AS max_total
    FROM TotalPrices
)
SELECT 
    tp.product_id,
    p.name,
    tp.total
FROM TotalPrices tp
JOIN Products p ON tp.product_id = p.product_id
JOIN MaxTotal mt ON tp.total = mt.max_total
ORDER BY tp.product_id
```

## Complexity

- **Time:** O(n log n) for grouping and sorting
- **Space:** O(n) for the CTEs
