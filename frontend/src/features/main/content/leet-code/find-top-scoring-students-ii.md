# 3188. Find Top Scoring Students II

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
This is the harder version of "Find Top Scoring Students": using the same students, courses, and enrollments schema (now with mandatory/elective course flags, grade point values, and credit weights), find all students who earned an 'A' in every mandatory course of their major, have taken at least 2 elective courses, and have an overall GPA (credit-weighted average) of at least 2.5.

### Schema
```sql
Create table If Not Exists Students (student_id int, student_name varchar(50), major varchar(50))
Create table If Not Exists Courses (course_id int, major varchar(50), mandatory varchar(3), credits int)
Create table If Not Exists Enrollments (student_id int, course_id int, grade varchar(2), GPA decimal(3,2))
```

## Approach
First, compute the number of mandatory courses per major. Then, for each student, aggregate three metrics from their enrollment history: the count of mandatory courses in their own major completed with an 'A' grade, the count of elective courses taken (regardless of major match), and their overall credit-weighted GPA (sum of GPA times credits, divided by sum of credits). Finally, filter for students whose mandatory-'A' count matches their major's total mandatory course count, who have taken at least 2 electives, and whose weighted GPA is at least 2.5.

## SQL Solution
```sql
WITH
  MandatoryMajors AS (
    SELECT major, COUNT(course_id) AS course_count
    FROM Courses
    WHERE mandatory = 'Yes'
    GROUP BY major
  ),
  StudentsMetadata AS (
    SELECT
      Students.student_id,
      Students.major,
      SUM(
        CASE WHEN Students.major = Courses.major
          AND Courses.mandatory = 'Yes'
          AND Enrollments.grade = 'A'
        THEN 1 ELSE 0 END
      ) AS mandatory_grade_a_count,
      SUM(CASE WHEN Courses.mandatory = 'No' THEN 1 ELSE 0 END) AS elective_count,
      ROUND(
        SUM(Enrollments.GPA * Courses.credits) / SUM(Courses.credits),
        1
      ) AS avg_gpa
    FROM Students
    INNER JOIN Enrollments
      ON Students.student_id = Enrollments.student_id
    INNER JOIN Courses
      ON Enrollments.course_id = Courses.course_id
    GROUP BY Students.student_id, Students.major
  )
SELECT StudentsMetadata.student_id
FROM StudentsMetadata
INNER JOIN MandatoryMajors
  ON StudentsMetadata.major = MandatoryMajors.major
  AND StudentsMetadata.mandatory_grade_a_count = MandatoryMajors.course_count
WHERE StudentsMetadata.avg_gpa >= 2.5 AND StudentsMetadata.elective_count >= 2
ORDER BY 1;
```

## Complexity
- Time: O(n log n) due to joins and grouping
- Space: O(n)
