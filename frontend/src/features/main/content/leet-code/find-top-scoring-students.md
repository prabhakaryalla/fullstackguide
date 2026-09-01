# 3182. Find Top Scoring Students

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A university tracks students (each with a declared major), the courses offered by each major, and student enrollments with grades. Find all students who received a grade of 'A' in every course offered by their own major (i.e., they've taken and gotten an 'A' in all of that major's courses).

### Schema
```sql
Create table If Not Exists Students (student_id int, student_name varchar(50), major varchar(50))
Create table If Not Exists Courses (course_id int, major varchar(50))
Create table If Not Exists Enrollments (student_id int, course_id int, grade varchar(2))
```

## Approach
First, compute the total number of courses offered per major. Then, for each student, join through their major's courses and their enrollments, counting how many of their major's courses they've completed with an 'A'. Finally, select the students whose 'A' course count matches the total course count for their major, meaning they aced every course in their major's curriculum.

## SQL Solution
```sql
WITH
  Majors AS (
    SELECT major, COUNT(course_id) AS course_count
    FROM Courses
    GROUP BY major
  ),
  StudentMetadata AS (
    SELECT
      Students.student_id,
      Students.major,
      SUM(
        CASE WHEN Students.major = Courses.major AND Enrollments.grade = 'A'
        THEN 1 ELSE 0 END
      ) AS major_grade_a_count
    FROM Students
    INNER JOIN Courses
      ON Students.major = Courses.major
    INNER JOIN Enrollments
      ON Students.student_id = Enrollments.student_id
      AND Courses.course_id = Enrollments.course_id
    GROUP BY Students.student_id, Students.major
  )
SELECT StudentMetadata.student_id
FROM StudentMetadata
INNER JOIN Majors
  ON StudentMetadata.major = Majors.major
  AND StudentMetadata.major_grade_a_count = Majors.course_count
ORDER BY 1;
```

## Complexity
- Time: O(n log n) due to joins and grouping
- Space: O(n)
