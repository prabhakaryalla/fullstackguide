# 3415. Find Products with Three Consecutive Digits

**Difficulty:** Medium
**Category:** Database, SQL
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a `Products` table with columns `product_id` and `name`, find all products whose `name` contains three consecutive digits (e.g. "abc123def" contains "123"). Return the `product_id` and `name` of matching products, ordered by `product_id`.

## Approach
Use a regular expression match on the `name` column looking for three consecutive digit characters (`[0-9]{3}`). Most SQL engines (MySQL 8+, PostgreSQL) support `REGEXP` or `~` operators for this. Filter the rows where the pattern matches, then order the result by `product_id`.

## SQL Solution

```sql
SELECT product_id, name
FROM Products
WHERE name REGEXP '[0-9]{3}'
ORDER BY product_id;
```

## Complexity

- **Time:** O(n * m), where n is the number of rows and m is the average length of `name` (regex scan per row)
- **Space:** O(1) additional space beyond the result set
