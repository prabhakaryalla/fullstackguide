# 1890. The Latest Login in 2020

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Logins` table (`user_id`, `time_stamp`), return each user's latest login timestamp that occurred during the year 2020.

### Schema

```
Logins: user_id, time_stamp
```

## Approach

Filter rows to those whose `time_stamp` falls in the year 2020, group by `user_id`, and take the maximum timestamp per user.

## SQL Solution

```sql
SELECT
    user_id,
    MAX(time_stamp) AS last_stamp
FROM Logins
WHERE YEAR(time_stamp) = 2020
GROUP BY user_id;
```

## Complexity

- **Time:** `O(n log n)` for the grouping.
- **Space:** `O(n)` for the result set.
