# 2989. Class Performance

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Scores
+---------------+------+
| Column Name   | Type |
+---------------+------+
| student_id    | int  |
| student_name  | varchar |
| assignment_id | int  |
| score         | int  |
+---------------+------+
(student_id, assignment_id) is the primary key.
```

Calculate the difference between the highest and lowest average assignment scores across all students. Return the result rounded to 2 decimal places.

### Example

```
Input:
Scores table:
+------------+--------------+---------------+-------+
| student_id | student_name | assignment_id | score |
+------------+--------------+---------------+-------+
| 1          | Alice        | 1             | 85    |
| 1          | Alice        | 2             | 90    |
| 2          | Bob          | 1             | 70    |
| 2          | Bob          | 2             | 75    |
+------------+--------------+---------------+-------+
Output:
+---------------------+
| difference_in_score |
+---------------------+
| 15.00               |
+---------------------+
Explanation: Alice avg = 87.5, Bob avg = 72.5, difference = 15.0
```

## Approach

Calculate each student's average score, then find the difference between max and min averages.

## SQL Solution

```sql
WITH StudentAvgs AS (
    SELECT 
        student_id,
        AVG(score) AS avg_score
    FROM Scores
    GROUP BY student_id
)
SELECT 
    ROUND(MAX(avg_score) - MIN(avg_score), 2) AS difference_in_score
FROM StudentAvgs;
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
