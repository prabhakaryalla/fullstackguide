# 1112. Highest Grade For Each Student

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `Enrollments` table (`student_id`, `course_id`, `grade`), find each student's highest grade. If a student has multiple courses with the same highest grade, keep the one with the smallest `course_id`. Order the result by `student_id`.

### Schema

```
Enrollments: student_id, course_id, grade
```

## Approach

Use a window function to rank each student's enrollments by `grade` descending and `course_id` ascending as a tiebreaker, then keep only the rank-`1` row for each student.

## SQL Solution

```sql
SELECT student_id, course_id, grade
FROM (
    SELECT student_id, course_id, grade,
           ROW_NUMBER() OVER (
               PARTITION BY student_id
               ORDER BY grade DESC, course_id ASC
           ) AS rn
    FROM Enrollments
) ranked
WHERE rn = 1
ORDER BY student_id;
```

## Complexity

- **Time:** `O(n log n)` for the partitioned sort.
- **Space:** `O(n)` for the ranked intermediate result.
