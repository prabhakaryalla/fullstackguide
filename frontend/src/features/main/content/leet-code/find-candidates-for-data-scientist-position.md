# 3051. Find Candidates for Data Scientist Position

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find all candidates who have all three of the required skills: `Python`, `Tableau`, and `PostgreSQL`. Return the result ordered by `candidate_id` ascending.

### Schema

```sql
Create table If Not Exists Candidates (candidate_id int, skill varchar(20))
```

`Candidates` has one row per (candidate, skill) pair a candidate possesses.

## Approach

Filter rows to only the three required skills, group by candidate, and keep only candidates whose count of matching (distinct) skills equals three — meaning they have all of them.

## SQL Solution

```sql
SELECT candidate_id
FROM Candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
HAVING COUNT(DISTINCT skill) = 3
ORDER BY candidate_id;
```

## Complexity

- Time: O(n log n) for the grouping/sort, where n is the number of (candidate, skill) rows.
- Space: O(n) for the grouped intermediate result.
