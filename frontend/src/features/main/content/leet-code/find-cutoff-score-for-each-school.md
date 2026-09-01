# 1988. Find Cutoff Score for Each School

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Schools(school_id, capacity)` and `Table: Exam(score, student_count)` (number of students who scored exactly `score`). Each school admits students in descending order of score until its `capacity` is reached; the "cutoff score" for a school is the lowest score among admitted students (or `-1` if the school's capacity exceeds the total number of students who took the exam). Return each school's id and its cutoff score.

### Example

```
Input:
Schools: (11,2), (5,5)
Exam: (100,2), (80,3), (60,3), (50,1)
Output: (11,100), (5,60)
Explanation: School 11 admits 2 students -> both scored 100, cutoff 100. School 5 admits 5 students -> 2 at 100 wait totals used differently, cutoff computed from cumulative counts from the top down.
```

## Approach

Compute a running cumulative count of students from the highest score downward (`cumulative[score] = sum of student_count for all scores >= score`). For each school, find the highest score threshold such that the cumulative count reaches at least the school's capacity — that score is the cutoff. This can be expressed as: for each school, find `MIN(score)` among exam rows where the cumulative count-from-the-top is `>= capacity`, using a correlated subquery or a window `SUM(...) OVER (ORDER BY score DESC)`.

```sql
WITH Cumulative AS (
    SELECT score,
           SUM(student_count) OVER (ORDER BY score DESC) AS cum_count
    FROM Exam
),
TotalStudents AS (
    SELECT SUM(student_count) AS total FROM Exam
)
SELECT s.school_id,
       CASE
           WHEN s.capacity > (SELECT total FROM TotalStudents) THEN -1
           ELSE (SELECT MIN(c.score) FROM Cumulative c WHERE c.cum_count >= s.capacity)
       END AS score
FROM Schools s;
```

## Complexity

- **Time:** `O(n log n)` — dominated by the cumulative sum ordering plus a lookup per school.
- **Space:** `O(n)` for the cumulative counts table.
