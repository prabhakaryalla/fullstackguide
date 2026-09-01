# 2985. Calculate Compressed Mean

**Difficulty:** Easy
**Category:** Array, Math, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Orders
+-------------+------+
| Column Name | Type |
+-------------+------+
| order_id    | int  |
| item_count  | int  |
| order_occurrences | int  |
+-------------+------+
order_id is the primary key.
```

Each row represents a unique order with its item count and how many times that exact order was placed. Calculate the mean item count across all order occurrences, rounded to 2 decimals.

### Example

```
Input:
Orders table:
+----------+------------+-------------------+
| order_id | item_count | order_occurrences |
+----------+------------+-------------------+
| 1        | 4          | 3                 |
| 2        | 6          | 2                 |
+----------+------------+-------------------+
Output:
+------+
| mean |
+------+
| 4.80 |
+------+
Explanation: Total items = 4*3 + 6*2 = 24, Total occurrences = 3+2 = 5, Mean = 24/5 = 4.8
```

## Approach

Calculate the weighted sum of items and divide by total occurrences.

## SQL Solution

```sql
SELECT 
    ROUND(SUM(item_count * order_occurrences) / SUM(order_occurrences), 2) AS mean
FROM Orders;
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
