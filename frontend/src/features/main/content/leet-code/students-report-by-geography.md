# 618. Students Report By Geography

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `student` table (`name`, `continent`), write a query to pivot the students into three columns — `America`, `Asia`, and `Europe` — each listing the (alphabetically sorted) names of students from that continent, aligned row by row.

### Schema

```
student: name, continent
```

## Approach

Assign each student a row number within their own continent group (ordered alphabetically by name), which gives students from different continents a shared "rank" to align by. Pivot the data using conditional aggregation: for each rank, pick out the name belonging to each continent (or `NULL` if that continent has fewer students at that rank), producing one row per rank across the three continent columns.

## SQL Solution

```sql
SELECT
    MAX(CASE WHEN continent = 'America' THEN name END) AS America,
    MAX(CASE WHEN continent = 'Asia' THEN name END) AS Asia,
    MAX(CASE WHEN continent = 'Europe' THEN name END) AS Europe
FROM (
    SELECT
        name,
        continent,
        ROW_NUMBER() OVER (PARTITION BY continent ORDER BY name) AS rn
    FROM student
) ranked
GROUP BY rn;
```

## Complexity

- **Time:** `O(n log n)` for the partitioned ordering.
- **Space:** `O(n)` for the ranked intermediate result.
