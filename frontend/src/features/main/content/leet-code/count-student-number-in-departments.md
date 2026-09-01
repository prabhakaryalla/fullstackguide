# 580. Count Student Number in Departments

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `department` table (`dept_id`, `dept_name`) and a `student` table (`student_id`, `student_name`, `dept_id`), write a query to report the number of students in each department, including departments with zero students, sorted by student count descending and department name ascending for ties.

### Schema

```
department: dept_id (PK), dept_name
student: student_id (PK), student_name, dept_id (FK)
```

## Approach

Since departments with no students must still be reported, use a `LEFT JOIN` from `department` to `student` (an inner join would drop empty departments). Group by department and count matched student rows, then order by that count descending, breaking ties alphabetically by department name.

## SQL Solution

```sql
SELECT d.dept_name, COUNT(s.student_id) AS student_number
FROM department d
LEFT JOIN student s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY student_number DESC, d.dept_name ASC;
```

## Complexity

- **Time:** `O(n log n)` for the sort, where `n` is the number of departments.
- **Space:** `O(n)` for the grouped intermediate result.
