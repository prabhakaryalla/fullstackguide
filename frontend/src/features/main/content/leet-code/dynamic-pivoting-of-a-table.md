# 2252. Dynamic Pivoting of a Table

**Difficulty:** Hard
**Category:** Database

## SQL Problem

Write a SQL query to pivot a table dynamically based on the distinct values in a column.

### Schema

```
Products table:
+------------+---------+--------+
| product_id | store   | price  |
+------------+---------+--------+
```

### Example

```
Input:
Products table:
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
| 1          | Shop   | 110   |
| 1          | LC_Store| 100  |
| 2          | Shop   | 200   |
| 2          | LC_Store| 150  |
+------------+--------+-------+

Output:
+------------+------+----------+
| product_id | Shop | LC_Store |
+------------+------+----------+
| 1          | 110  | 100      |
| 2          | 200  | 150      |
+------------+------+----------+
```

## SQL Solution

```sql
SELECT 
    product_id,
    MAX(CASE WHEN store = 'Shop' THEN price END) AS Shop,
    MAX(CASE WHEN store = 'LC_Store' THEN price END) AS LC_Store
FROM Products
GROUP BY product_id
```

## Complexity

- **Time:** O(n) for scanning and grouping
- **Space:** O(n)
