# 1280. Students and Examinations

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Students` (`student_id`, `student_name`), `Subjects` (`subject_name`), and `Examinations` (`student_id`, `subject_name`, one row per exam attended), report for every student and every subject the number of times that student attended that subject's exam — including `0` for combinations never attended — ordered by `student_id` then `subject_name`.

### Schema

```
Students: student_id (PK), student_name
Subjects: subject_name (PK)
Examinations: student_id, subject_name
```

## Approach

Cross join `Students` with `Subjects` to enumerate every possible `(student, subject)` combination, regardless of whether an exam was ever taken. Left join that combination set to `Examinations` so unmatched combinations still appear (with null exam rows), then group by student and subject and count the matched exam rows — `COUNT` naturally ignores nulls, yielding `0` for combinations with no matches.

## SQL Solution

```sql
SELECT s.student_id, s.student_name, sub.subject_name,
       COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e
    ON e.student_id = s.student_id AND e.subject_name = sub.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;
```

## Complexity

- **Time:** `O(n * m)`, where `n` is the number of students and `m` is the number of subjects.
- **Space:** `O(n * m)` for the cross-joined intermediate result.
