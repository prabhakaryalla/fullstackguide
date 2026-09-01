# 1142. User Activity for the Past 30 Days II

**Difficulty:** Easy
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `Activity` table (`user_id`, `session_id`, `activity_date`, `activity_type`), compute the average number of sessions per active user for the 30-day period ending on `2019-07-27`, rounded to two decimal places. Return `0.00` if there were no active users in that period.

### Schema

```
Activity: user_id, session_id, activity_date, activity_type
```

## Approach

Within the 30-day window, count the total distinct sessions and divide by the total distinct active users. Guard against division by zero with `NULLIF`, and default to `0` with `IFNULL` when there are no active users at all.

## SQL Solution

```sql
SELECT
    ROUND(
        IFNULL(
            (SELECT COUNT(DISTINCT session_id) FROM Activity
             WHERE activity_date BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27') * 1.0 /
            NULLIF((SELECT COUNT(DISTINCT user_id) FROM Activity
             WHERE activity_date BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27'), 0),
            0
        ), 2
    ) AS average_sessions_per_user;
```

## Complexity

- **Time:** `O(n)` for the two aggregate scans.
- **Space:** `O(1)` for the scalar aggregates.
