# 1355. Activity Participants

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Friends` table (`id`, `name`, `activity`), write a query that reports the students whose activity is neither the most popular nor the least popular one (by participant count).

### Schema

```
Friends: id (PK), name, activity
```

## Approach

Count the number of participants for each activity, then determine the overall maximum and minimum of those counts. Keep only the rows whose activity's participant count is strictly between those two extremes (or equal to neither).

## SQL Solution

```sql
WITH counts AS (
    SELECT activity, COUNT(*) AS cnt
    FROM Friends
    GROUP BY activity
)
SELECT f.id, f.name, f.activity
FROM Friends f
JOIN counts c ON f.activity = c.activity
WHERE c.cnt <> (SELECT MAX(cnt) FROM counts)
  AND c.cnt <> (SELECT MIN(cnt) FROM counts);
```

## Complexity

- **Time:** `O(n)` for the grouped counts and join.
- **Space:** `O(distinct activities)`.
