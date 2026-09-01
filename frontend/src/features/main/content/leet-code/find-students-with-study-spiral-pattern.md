# 3617. Find Students with Study Spiral Pattern

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Table `students` has columns `student_id`, `student_name`, `major`. Table `study_sessions` has columns `session_id`, `student_id`, `subject`, `session_date`, `hours_studied`.

Find students who follow a Study Spiral Pattern: students who consistently study multiple subjects in a repeating cycle.

- A study spiral means the student studies at least 3 different subjects in a repeating sequence.
- The pattern must repeat for at least 2 complete cycles (at least 6 study sessions).
- Sessions must occur on consecutive dates with no gap longer than 2 days between sessions.
- Compute the cycle length (number of distinct subjects in the repeating pattern) and the total study hours across all sessions in the pattern.
- Only include students whose cycle length is at least 3.

Return the result table ordered by cycle length descending, then by total study hours descending.

## Approach
Order each student's sessions chronologically and compute, per student, the number of distinct subjects (candidate cycle length), the total session count, the total hours, and the maximum gap between consecutive session dates. A student's session sequence is a valid spiral if: the cycle length is at least 3, the total session count is at least twice the cycle length and an exact multiple of it (at least 2 full cycles), the maximum gap between consecutive sessions is at most 2 days, and the subject at position `i` always matches the subject at position `i - cycle_length` (the sequence truly repeats). The last condition is checked with a self-join comparing each session to the one exactly one cycle length earlier, requiring no mismatches.

## SQL Solution

```sql
WITH ordered AS (
    SELECT
        student_id,
        subject,
        session_date,
        hours_studied,
        ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY session_date) AS rn,
        DATEDIFF(
            session_date,
            LAG(session_date) OVER (PARTITION BY student_id ORDER BY session_date)
        ) AS gap_days
    FROM study_sessions
),
agg AS (
    SELECT
        student_id,
        COUNT(*) AS total_sessions,
        COUNT(DISTINCT subject) AS cycle_length,
        SUM(hours_studied) AS total_study_hours,
        MAX(gap_days) AS max_gap
    FROM ordered
    GROUP BY student_id
),
candidates AS (
    SELECT
        a.student_id,
        a.cycle_length,
        a.total_study_hours
    FROM agg a
    WHERE a.cycle_length >= 3
      AND a.total_sessions >= 2 * a.cycle_length
      AND a.total_sessions % a.cycle_length = 0
      AND (a.max_gap IS NULL OR a.max_gap <= 2)
      AND NOT EXISTS (
          SELECT 1
          FROM ordered o1
          JOIN ordered o2
            ON o2.student_id = o1.student_id
           AND o2.rn = o1.rn + a.cycle_length
          WHERE o1.student_id = a.student_id
            AND o1.subject <> o2.subject
      )
)
SELECT
    s.student_id,
    s.student_name,
    s.major,
    c.cycle_length,
    ROUND(c.total_study_hours, 2) AS total_study_hours
FROM candidates c
JOIN students s ON s.student_id = c.student_id
ORDER BY c.cycle_length DESC, c.total_study_hours DESC;
```

## Complexity

- **Time:** O(n log n), where n is the number of study sessions.
- **Space:** O(n)
