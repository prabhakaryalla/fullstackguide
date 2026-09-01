# 1308. Running Total for Different Genders

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Scores` table (`player_name`, `gender`, `day`, `score_points`), write a query that reports the running total of `score_points` for each gender, ordered by `day`.

### Schema

```
Scores: player_name, gender, day, score_points
```

## Approach

For every `(gender, day)` pair, sum the `score_points` of all rows with the same gender whose `day` is less than or equal to it. This can be expressed with a self-join on `gender` and a `day <=` condition, grouped by `gender` and `day`.

## SQL Solution

```sql
SELECT s1.gender, s1.day,
       SUM(s2.score_points) AS total
FROM Scores s1
JOIN Scores s2
    ON s1.gender = s2.gender AND s2.day <= s1.day
GROUP BY s1.gender, s1.day
ORDER BY s1.gender, s1.day;
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the range self-join.
- **Space:** `O(n)` for the grouped result.
