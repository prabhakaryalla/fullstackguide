# 2854. Rolling Average Steps

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to calculate a rolling 3-day average of steps for each user. For each date, include the average steps for that date and the previous 2 days (if they exist).

Given a table `Steps`:
- `user_id` (int): user ID
- `steps_date` (date): date of step count
- `steps_count` (int): number of steps

Return the result with `user_id`, `steps_date`, and the `rolling_average` (rounded to 2 decimal places).

### Schema

```sql
CREATE TABLE Steps (
    user_id INT,
    steps_date DATE,
    steps_count INT
);
```

### Example

```
Input:
Steps table:
+---------+------------+-------------+
| user_id | steps_date | steps_count |
+---------+------------+-------------+
| 1       | 2023-01-01 | 100         |
| 1       | 2023-01-02 | 150         |
| 1       | 2023-01-03 | 200         |
+---------+------------+-------------+

Output:
+---------+------------+-----------------+
| user_id | steps_date | rolling_average |
+---------+------------+-----------------+
| 1       | 2023-01-01 | 100.00          |
| 1       | 2023-01-02 | 125.00          |
| 1       | 2023-01-03 | 150.00          |
+---------+------------+-----------------+
```

## Approach

Use a window function with `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` to calculate the rolling average for the current row and up to 2 previous rows.

## SQL Solution

```sql
SELECT 
    user_id,
    steps_date,
    ROUND(AVG(steps_count) OVER (
        PARTITION BY user_id 
        ORDER BY steps_date 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS rolling_average
FROM Steps
ORDER BY user_id, steps_date;
```

## Complexity

- **Time:** O(n log n) for sorting within each partition.
- **Space:** O(1) for the window calculation.
