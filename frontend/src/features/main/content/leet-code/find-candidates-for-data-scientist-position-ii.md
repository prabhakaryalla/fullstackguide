# 3278. Find Candidates for Data Scientist Position II

**Difficulty:** Medium
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
This is the generalized follow-up to "Find Candidates for Data Scientist Position": instead of a hardcoded skill list (`Python`, `Tableau`, `PostgreSQL`), the required skills are now given by a separate `Requirements` table, which may contain any number of required skills. Write a solution to find all candidates who possess **every** skill listed in `Requirements`. Return the result ordered by `candidate_id` ascending.

### Schema

```sql
Create table If Not Exists Candidates (candidate_id int, skill varchar(20))
Create table If Not Exists Requirements (skill varchar(20))
```

`Candidates` has one row per (candidate, skill) pair a candidate possesses. `Requirements` lists every skill a qualifying candidate must have.

## Approach
Join `Candidates` to `Requirements` on `skill` so only rows for required skills remain, then group by `candidate_id` and keep only the candidates whose count of distinct matched skills equals the total number of required skills — meaning they have all of them.

## SQL Solution

```sql
SELECT c.candidate_id
FROM Candidates c
JOIN Requirements r ON c.skill = r.skill
GROUP BY c.candidate_id
HAVING COUNT(DISTINCT c.skill) = (SELECT COUNT(*) FROM Requirements)
ORDER BY c.candidate_id;
```

## Complexity

- **Time:** O(n log n) for the join and grouping, where n is the number of rows in `Candidates`.
- **Space:** O(n) for the grouped intermediate result.
