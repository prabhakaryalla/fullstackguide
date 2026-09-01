# 3328. Find Cities in Each State II

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Using the same `Cities` table as "Find Cities in Each State", return, for every state that has **more than one** city, the number of cities in that state and a single comma-separated string of its city names sorted alphabetically.

### Schema
```sql
Create table If Not Exists Cities (city varchar(50), state varchar(50))
```

## Approach
Group all rows by state, count the cities per group, and filter with `HAVING` to keep only states with more than one city. Use a string-aggregation function with an internal `ORDER BY` to combine the city names alphabetically into a single string per state.

## SQL Solution

```sql
SELECT
  state,
  COUNT(*) AS city_count,
  GROUP_CONCAT(city ORDER BY city SEPARATOR ', ') AS cities
FROM Cities
GROUP BY state
HAVING COUNT(*) > 1
ORDER BY state;
```

## Complexity

- **Time:** O(n log n) due to sorting within groups
- **Space:** O(n)
