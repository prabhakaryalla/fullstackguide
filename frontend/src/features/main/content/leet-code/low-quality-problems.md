# 2026. Low-Quality Problems

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Problems(problem_id, likes, dislikes)` stores like/dislike counts for problems. The quality of a problem is `likes / (likes + dislikes)`. A problem is "low quality" if its quality is strictly less than 60%. Return the ids of all low-quality problems, sorted in ascending order.

### Schema

```
Problems: problem_id (PK), likes, dislikes
```

## Approach

Compute the ratio directly in the `WHERE` clause and filter for values below 0.6, then order by `problem_id`.

## SQL Solution

```sql
SELECT problem_id
FROM Problems
WHERE likes / (likes + dislikes) < 0.6
ORDER BY problem_id;
```

## Complexity

- **Time:** O(n log n) for the final sort
- **Space:** O(n)
