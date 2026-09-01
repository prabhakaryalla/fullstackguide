# 1412. Find the Quiet Students in All Exams

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Student` table (`student_id`, `student_name`) and an `Exam` table (`exam_id`, `student_id`, `score`), a student is "quiet" if, for every exam they took, their score was neither the highest nor the lowest score of that exam, and they took at least one exam. Return the quiet students ordered by `student_id`.

### Schema

```
Student: student_id (PK), student_name
Exam: (exam_id, student_id) (PK), score
```

## Approach

First compute the maximum and minimum score for each `exam_id`. A student is disqualified from being "quiet" if any of their exam scores equals the max or min score for that exam. Select students who took at least one exam and are not present in that disqualified set.

## SQL Solution

```sql
SELECT s.student_id, s.student_name
FROM Student s
WHERE s.student_id IN (SELECT student_id FROM Exam)
  AND s.student_id NOT IN (
      SELECT e.student_id
      FROM Exam e
      JOIN (
          SELECT exam_id, MAX(score) AS max_score, MIN(score) AS min_score
          FROM Exam
          GROUP BY exam_id
      ) bounds ON e.exam_id = bounds.exam_id
      WHERE e.score = bounds.max_score OR e.score = bounds.min_score
  )
ORDER BY s.student_id;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and join operations.
- **Space:** `O(n)` for the intermediate max/min table.
