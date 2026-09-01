# 3764. Most Common Course Pairs

**Difficulty:** Hard
**Category:** SQL, Database

## Problem

Table `course_completions(user_id, course_id, course_name, completion_date, course_rating)` records completed courses. Consider only "top performers": users who completed at least 5 courses with an average rating of at least 4. For each top performer, find consecutive course pairs (in chronological order of completion) and return each pair's transition frequency, ordered by frequency descending, then by first course name and second course name ascending.

### Schema

```
Table: course_completions
+-------------------+---------+
| Column Name       | Type    |
+-------------------+---------+
| user_id           | int     |
| course_id         | int     |
| course_name       | varchar |
| completion_date   | date    |
| course_rating     | int     |
+-------------------+---------+
(user_id, course_id) is unique.
```

## Approach

Filter users via `GROUP BY user_id HAVING COUNT(*) >= 5 AND AVG(course_rating) >= 4`. For each such user, use `LEAD()` ordered by `completion_date` to pair each course with the next one chronologically, then group by the `(first_course, second_course)` pair and count occurrences.

## SQL Solution

```sql
WITH top_performers AS (
    SELECT user_id
    FROM course_completions
    GROUP BY user_id
    HAVING COUNT(*) >= 5 AND AVG(course_rating) >= 4
),
sequenced AS (
    SELECT
        cc.course_name AS first_course,
        LEAD(cc.course_name) OVER (
            PARTITION BY cc.user_id ORDER BY cc.completion_date
        ) AS second_course
    FROM course_completions cc
    INNER JOIN top_performers tp ON cc.user_id = tp.user_id
)
SELECT
    first_course,
    second_course,
    COUNT(*) AS transition_count
FROM sequenced
WHERE second_course IS NOT NULL
GROUP BY first_course, second_course
ORDER BY transition_count DESC, first_course ASC, second_course ASC;
```

## Complexity

- **Time:** O(n log n) for sorting/window functions
- **Space:** O(n)
