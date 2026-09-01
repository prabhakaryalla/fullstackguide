# 2072. The Winner University

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `NewYork(student_id, score)` and table `California(student_id, score)` each list exam scores for students of that university. Count how many students from each university scored strictly greater than 90. If New York's count is more than 2 greater than California's, the winner is `'New York University'`. If California's count is more than 2 greater than New York's, the winner is `'California University'`. Otherwise, the result is `'No Winner'`.

### Schema

```
NewYork: student_id, score
California: student_id, score
```

## Approach

Compute each university's count of scores over 90 in a subquery, then compare the two counts with the `CASE` thresholds.

## SQL Solution

```sql
SELECT
    CASE
        WHEN ny.cnt > ca.cnt + 2 THEN 'New York University'
        WHEN ca.cnt > ny.cnt + 2 THEN 'California University'
        ELSE 'No Winner'
    END AS winner
FROM
    (SELECT COUNT(*) AS cnt FROM NewYork WHERE score > 90) ny,
    (SELECT COUNT(*) AS cnt FROM California WHERE score > 90) ca;
```

## Complexity

- **Time:** O(n + m)
- **Space:** O(1)
