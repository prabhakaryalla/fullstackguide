# 2314. The First Day of the Maximum Recorded Degree in Each City

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to report the day that has the maximum recorded degree in each city. If the maximum degree was recorded for the same city multiple times, return the earliest day among them.

Return the result table ordered by `city_id` in ascending order.

### Schema

```
Table: Weather
+-------------+------+
| Column Name | Type |
+-------------+------+
| city_id     | int  |
| day         | date |
| degree      | int  |
+-------------+------+
(city_id, day) is the primary key for this table.
Each row contains the degree of weather recorded for a city on a specific day.
```

### Example

```
Input:
Weather table:
+---------+------------+--------+
| city_id | day        | degree |
+---------+------------+--------+
| 1       | 2022-01-07 | -12    |
| 1       | 2022-03-07 |  5     |
| 1       | 2022-07-07 |  24    |
| 2       | 2022-08-07 |  37    |
| 2       | 2022-08-17 |  37    |
| 3       | 2022-02-07 |  7     |
| 3       | 2022-12-07 |  7     |
+---------+------------+--------+

Output:
+---------+------------+--------+
| city_id | day        | degree |
+---------+------------+--------+
| 1       | 2022-07-07 |  24    |
| 2       | 2022-08-07 |  37    |
| 3       | 2022-02-07 |  7     |
+---------+------------+--------+
```

## Approach

1. Find the maximum degree for each city
2. Join back to find all days with that maximum degree
3. For each city, select the earliest day (MIN) among those with the maximum degree

Use a CTE or subquery to find max degrees, then filter and aggregate.

## SQL Solution

```sql
WITH MaxDegrees AS (
    SELECT city_id, MAX(degree) AS max_degree
    FROM Weather
    GROUP BY city_id
)
SELECT 
    w.city_id,
    MIN(w.day) AS day,
    w.degree
FROM Weather w
JOIN MaxDegrees m
    ON w.city_id = m.city_id AND w.degree = m.max_degree
GROUP BY w.city_id, w.degree
ORDER BY w.city_id
```

## Complexity

- **Time:** O(n log n) for grouping and sorting
- **Space:** O(n) for the CTE
