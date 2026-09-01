# 3060. User Activities within Time Bounds

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find every user who started a new session of the same `session_type` within 12 hours of ending their previous session of that type. Return the distinct user ids, ordered ascending.

### Schema

```sql
Create table If Not Exists Sessions (session_id int, user_id int, session_type varchar(10), session_start datetime, session_end datetime)
```

`Sessions` has one row per user session, including its `session_type`, `session_start`, and `session_end`.

## Approach

For each row, use the window function `LAG()` (partitioned by `user_id` and `session_type`, ordered by `session_end`) to look up the end time of that user's previous session of the same type. Compute the hour difference between the previous session's end and the current session's start, and keep users where that gap is 12 hours or less.

## SQL Solution

```sql
WITH SessionDifferences AS (
  SELECT
    user_id,
    session_start,
    LAG(session_end) OVER (
      PARTITION BY user_id, session_type
      ORDER BY session_end
    ) AS prev_session_end
  FROM Sessions
)
SELECT DISTINCT user_id
FROM SessionDifferences
WHERE TIMESTAMPDIFF(HOUR, prev_session_end, session_start) <= 12
ORDER BY user_id;
```

## Complexity

- Time: O(n log n) for the windowed sort, where n is the number of session rows.
- Space: O(n) for the intermediate windowed rows.
