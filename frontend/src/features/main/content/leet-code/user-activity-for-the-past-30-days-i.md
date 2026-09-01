# 1141. User Activity for the Past 30 Days I

**Difficulty:** Easy
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `Activity` table (`user_id`, `session_id`, `activity_date`, `activity_type`), find the daily active user count for the 30-day period ending on `2019-07-27` (inclusive).

### Schema

```
Activity: user_id, session_id, activity_date, activity_type
```

## Approach

Filter rows down to the 30-day window ending at the reference date, then group by `activity_date` and count distinct `user_id` values to get the number of unique active users per day.

## SQL Solution

```sql
SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27'
GROUP BY activity_date;
```

## Complexity

- **Time:** `O(n log n)` for the grouping.
- **Space:** `O(n)` for the intermediate grouped result.
