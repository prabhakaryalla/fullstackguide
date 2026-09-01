# 2253. Dynamic Unpivoting of a Table

**Difficulty:** Hard
**Category:** Database

## SQL Problem

Write a SQL query to unpivot a table, converting columns into rows.

### Schema

```
Products table:
+------------+------+----------+
| product_id | Shop | LC_Store |
+------------+------+----------+
```

### Example

```
Input:
Products table:
+------------+------+----------+
| product_id | Shop | LC_Store |
+------------+------+----------+
| 1          | 110  | 100      |
| 2          | 200  | 150      |
+------------+------+----------+

Output:
+------------+----------+-------+
| product_id | store    | price |
+------------+----------+-------+
| 1          | Shop     | 110   |
| 1          | LC_Store | 100   |
| 2          | Shop     | 200   |
| 2          | LC_Store | 150   |
+------------+----------+-------+
```

## SQL Solution

```sql
SELECT product_id, 'Shop' AS store, Shop AS price
FROM Products
WHERE Shop IS NOT NULL
UNION ALL
SELECT product_id, 'LC_Store' AS store, LC_Store AS price
FROM Products
WHERE LC_Store IS NOT NULL
```

## Complexity

- **Time:** O(n * k) where k is the number of columns to unpivot
- **Space:** O(n * k)
