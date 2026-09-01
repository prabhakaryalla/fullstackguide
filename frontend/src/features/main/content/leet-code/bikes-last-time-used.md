# 2687. Bikes Last Time Used

**Difficulty:** Easy
**Category:** Database

## Problem

Table: Bikes

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| ride_id     | int      |
| bike_number | int      |
| start_time  | datetime |
| end_time    | datetime |
+-------------+----------+
```

`ride_id` is the primary key. Each row contains information about a bike ride including the bike number and start/end times.

Write an SQL query to find each bike's last used time (latest end_time). If a bike was never used, do not include it in the result.

Return the result table ordered by bike_number in ascending order.

### Schema

```sql
CREATE TABLE Bikes (
    ride_id INT PRIMARY KEY,
    bike_number INT,
    start_time DATETIME,
    end_time DATETIME
);
```

### Example

```
Input:
Bikes table:
+---------+-------------+---------------------+---------------------+
| ride_id | bike_number | start_time          | end_time            |
+---------+-------------+---------------------+---------------------+
| 1       | 101         | 2023-01-01 08:00:00 | 2023-01-01 09:00:00 |
| 2       | 102         | 2023-01-01 10:00:00 | 2023-01-01 11:00:00 |
| 3       | 101         | 2023-01-02 08:00:00 | 2023-01-02 09:30:00 |
| 4       | 102         | 2023-01-02 10:00:00 | 2023-01-02 10:45:00 |
+---------+-------------+---------------------+---------------------+

Output:
+-------------+---------------------+
| bike_number | end_time            |
+-------------+---------------------+
| 101         | 2023-01-02 09:30:00 |
| 102         | 2023-01-02 10:45:00 |
+-------------+---------------------+
```

## Approach

Group by bike_number and find the maximum end_time for each bike.

## SQL Solution

```sql
SELECT 
    bike_number,
    MAX(end_time) AS end_time
FROM Bikes
GROUP BY bike_number
ORDER BY bike_number;
```

## Complexity

- **Time:** O(n log n) for grouping and sorting
- **Space:** O(b) where b is the number of distinct bikes
