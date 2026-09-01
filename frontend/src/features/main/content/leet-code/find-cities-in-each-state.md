# 3198. Find Cities in Each State

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table stores cities along with the state each belongs to. For each state, list all its cities as a single comma-separated string, with the city names sorted alphabetically within each state's list.

### Schema
```sql
Create table If Not Exists Cities (city varchar(50), state varchar(50))
```

## Approach
Group all city rows by state, and use a string-aggregation function to combine city names within each group into one comma-separated string, ensuring the cities are sorted alphabetically before being concatenated.

## SQL Solution
```sql
SELECT
  state,
  GROUP_CONCAT(city ORDER BY city SEPARATOR ', ') AS cities
FROM Cities
GROUP BY state
ORDER BY state;
```

## Complexity
- Time: O(n log n) due to sorting within groups
- Space: O(n)
