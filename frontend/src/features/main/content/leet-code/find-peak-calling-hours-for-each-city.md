# 2984. Find Peak Calling Hours for Each City

**Difficulty:** Medium
**Category:** Array, Hash Table, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Calls
+-------------+------+
| Column Name | Type |
+-------------+------+
| caller_id   | int  |
| recipient_id| int  |
| call_time   | time |
| city        | varchar |
+-------------+------+
```

Find the hour with the maximum number of calls for each city. Return city and peak hour.

### Example

```
Input:
Calls table:
+-----------+--------------+-----------+----------+
| caller_id | recipient_id | call_time | city     |
+-----------+--------------+-----------+----------+
| 1         | 2            | 09:00:00  | New York |
| 3         | 4            | 09:30:00  | New York |
| 5         | 6            | 10:15:00  | Seattle  |
+-----------+--------------+-----------+----------+
Output:
+----------+------+
| city     | peak_hour |
+----------+------+
| New York | 9    |
| Seattle  | 10   |
+----------+------+
```

## Approach

Extract the hour from call_time, group by city and hour, count calls, then select the hour with maximum count per city.

## SQL Solution

```sql
WITH HourlyCounts AS (
    SELECT 
        city,
        HOUR(call_time) AS hour,
        COUNT(*) AS call_count
    FROM Calls
    GROUP BY city, HOUR(call_time)
),
MaxCounts AS (
    SELECT
        city,
        MAX(call_count) AS max_count
    FROM HourlyCounts
    GROUP BY city
)
SELECT 
    hc.city,
    MIN(hc.hour) AS peak_hour
FROM HourlyCounts hc
JOIN MaxCounts mc ON hc.city = mc.city AND hc.call_count = mc.max_count
GROUP BY hc.city
ORDER BY hc.city;
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
