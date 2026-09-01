# 2356. Number of Unique Subjects Taught by Each Teacher

**Difficulty:** Easy
**Category:** Database

## Problem

Write a SQL query to report the number of unique subjects each teacher teaches in the university.

Return the result table in any order.

### Schema

```
Table: Teacher
+-------------+------+
| Column Name | Type |
+-------------+------+
| teacher_id  | int  |
| subject_id  | int  |
| dept_id     | int  |
+-------------+------+
(subject_id, dept_id) is the primary key for this table.
Each row contains information about a teacher teaching a subject in a department.
```

### Example

```
Input:
Teacher table:
+------------+------------+---------+
| teacher_id | subject_id | dept_id |
+------------+------------+---------+
| 1          | 2          | 3       |
| 1          | 2          | 4       |
| 1          | 3          | 3       |
| 2          | 1          | 1       |
| 2          | 2          | 1       |
| 2          | 3          | 1       |
| 2          | 4          | 1       |
+------------+------------+---------+

Output:
+------------+-----+
| teacher_id | cnt |
+------------+-----+
| 1          | 2   |
| 2          | 4   |
+------------+-----+
Explanation:
Teacher 1 teaches 2 unique subjects (2 and 3).
Teacher 2 teaches 4 unique subjects (1, 2, 3, and 4).
```

## Approach

Group by teacher_id and count the distinct subject_id values for each teacher.

## SQL Solution

```sql
SELECT 
    teacher_id,
    COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id
```

## Complexity

- **Time:** O(n log n) for grouping
- **Space:** O(n) for the result set
