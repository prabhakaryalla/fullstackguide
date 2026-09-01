# 2346. Compute the Rank as a Percentage

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to report the rank of each student as a percentage, where the rank percentage of a student is computed using the formula:

`rank_percentile = (number of students with scores less than or equal to the student's score / total number of students) * 100`

Round the percentile to 2 decimal places. Return the result table in any order.

### Schema

```
Table: Scores
+-------------+------+
| Column Name | Type |
+-------------+------+
| student_id  | int  |
| score       | int  |
+-------------+------+
student_id is the primary key for this table.
Each row contains the ID of a student and their exam score.
```

### Example

```
Input:
Scores table:
+------------+-------+
| student_id | score |
+------------+-------+
| 1          | 75    |
| 2          | 87    |
| 3          | 92    |
| 4          | 87    |
+------------+-------+

Output:
+------------+-------+-----------------+
| student_id | score | rank_percentile |
+------------+-------+-----------------+
| 1          | 75    | 25.00           |
| 2          | 87    | 75.00           |
| 3          | 92    | 100.00          |
| 4          | 87    | 75.00           |
+------------+-------+-----------------+
```

## Approach

For each student, count how many students have a score less than or equal to theirs, then divide by the total number of students and multiply by 100.

Use a self-join or window function to compute the rank-based percentile.

## SQL Solution

```sql
SELECT 
    s1.student_id,
    s1.score,
    ROUND(
        (SUM(CASE WHEN s2.score <= s1.score THEN 1 ELSE 0 END) * 100.0) / COUNT(*),
        2
    ) AS rank_percentile
FROM Scores s1
CROSS JOIN Scores s2
GROUP BY s1.student_id, s1.score
ORDER BY s1.student_id
```

## Complexity

- **Time:** O(n^2) where n is the number of students
- **Space:** O(n) for the result set
