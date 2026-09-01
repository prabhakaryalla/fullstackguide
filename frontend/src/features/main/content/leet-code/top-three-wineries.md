# 2991. Top Three Wineries

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Wineries
+---------------+----------+
| Column Name   | Type     |
+---------------+----------+
| winery_id     | int      |
| country       | varchar  |
| points        | int      |
+---------------+----------+
winery_id is the primary key.
```

For each country, return the top 3 wineries by points. If a country has fewer than 3 wineries, return all of them. Order by country, then by points descending.

### Example

```
Input:
Wineries table:
+-----------+---------+--------+
| winery_id | country | points |
+-----------+---------+--------+
| 1         | USA     | 95     |
| 2         | USA     | 90     |
| 3         | USA     | 88     |
| 4         | France  | 92     |
+-----------+---------+--------+
Output:
+---------+-----------+--------+------+
| country | winery_1  | winery_2  | winery_3  |
+---------+-----------+--------+------+
| France  | 4(92)     | null   | null |
| USA     | 1(95)     | 2(90)  | 3(88)|
+---------+-----------+--------+------+
```

## Approach

Use ROW_NUMBER() to rank wineries within each country, then pivot to show top 3 as columns.

## SQL Solution

```sql
WITH RankedWineries AS (
    SELECT 
        country,
        winery_id,
        points,
        ROW_NUMBER() OVER (PARTITION BY country ORDER BY points DESC, winery_id) AS rn
    FROM Wineries
)
SELECT 
    country,
    MAX(CASE WHEN rn = 1 THEN CONCAT(winery_id, ' (', points, ')') END) AS top_winery,
    MAX(CASE WHEN rn = 2 THEN CONCAT(winery_id, ' (', points, ')') END) AS second_winery,
    MAX(CASE WHEN rn = 3 THEN CONCAT(winery_id, ' (', points, ')') END) AS third_winery
FROM RankedWineries
WHERE rn <= 3
GROUP BY country
ORDER BY country;
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
