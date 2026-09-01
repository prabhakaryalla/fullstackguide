# 2893. Calculate Orders Within Each Interval

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to calculate the number of orders within 6-minute intervals for each minute of the day. For each minute `t`, count orders where `order_time` is in the range `[t, t+6)` minutes.

Given a table `Orders`:
- `order_id` (int): order ID
- `order_time` (int): time in minutes from start of day (0-1439)

Return the result grouped by `minute` with the count of orders in that 6-minute window.

### Schema

```sql
CREATE TABLE Orders (
    order_id INT,
    order_time INT
);
```

### Example

```
Input:
Orders table:
+----------+------------+
| order_id | order_time |
+----------+------------+
| 1        | 5          |
| 2        | 10         |
| 3        | 12         |
+----------+------------+

Output (showing sample minutes):
+--------+-------------+
| minute | order_count |
+--------+-------------+
| 5      | 3           |
| 6      | 2           |
| 10     | 2           |
+--------+-------------+
```

## Approach

Use a self-join or window function to count orders within each 6-minute interval. For each order at time `t`, count all orders where `order_time BETWEEN t AND t+5`.

## SQL Solution

```sql
SELECT 
    o1.order_time AS minute,
    COUNT(o2.order_id) AS order_count
FROM Orders o1
LEFT JOIN Orders o2 
    ON o2.order_time BETWEEN o1.order_time AND o1.order_time + 5
GROUP BY o1.order_time
ORDER BY minute;
```

## Complexity

- **Time:** O(n²) due to the join — can be optimized with window functions.
- **Space:** O(n) for result.
