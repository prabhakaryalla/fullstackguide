# 3421. Find Students Who Improved

**Difficulty:** Medium
**Category:** Database, SQL

## Problem
Table `Scores` has columns `student_id`, `subject`, `semester` (`1` or `2`), and `score`, recording the score a student earned in a subject during each semester. A student is considered **improved** if, for every subject in which they have a recorded score in both semester `1` and semester `2`, their semester `2` score is strictly greater than their semester `1` score, and they have at least one such subject. Return the `student_id` of all improved students, ordered by `student_id`.

## Approach
Self-join the `Scores` table on `student_id` and `subject`, pairing each subject's semester-1 row with its semester-2 row. Group by `student_id` and use `HAVING` to require that every paired subject shows improvement (`SUM(CASE WHEN s2.score <= s1.score THEN 1 ELSE 0 END) = 0`) while also requiring at least one paired subject exists (`COUNT(*) > 0`, guaranteed by the join itself).

## SQL Solution

```sql
SELECT s1.student_id
FROM Scores s1
JOIN Scores s2
  ON s1.student_id = s2.student_id
 AND s1.subject = s2.subject
 AND s1.semester = 1
 AND s2.semester = 2
GROUP BY s1.student_id
HAVING SUM(CASE WHEN s2.score <= s1.score THEN 1 ELSE 0 END) = 0
ORDER BY s1.student_id;
```

## Complexity

- **Time:** O(n²) in the worst case for the self-join without indexes, O(n log n) with an index on `(student_id, subject, semester)`
- **Space:** O(n) for the joined intermediate result
