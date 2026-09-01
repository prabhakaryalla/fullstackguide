# 1107. New Users Daily Count

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Traffic` table (`user_id`, `activity`, `activity_date`), report for each date in the 90 days leading up to `2019-06-30` the number of users whose *first-ever* login (`activity = 'login'`) happened on that date.

### Schema

```
Traffic: user_id, activity, activity_date
```

## Approach

First compute each user's earliest login date with a `GROUP BY user_id`. Then keep only the rows whose first-login date falls within 90 days of the reference date, and group those by date to count distinct users.

## SQL Solution

```sql
SELECT activity_date AS login_date, COUNT(DISTINCT user_id) AS user_count
FROM (
    SELECT user_id, MIN(activity_date) AS activity_date
    FROM Traffic
    WHERE activity = 'login'
    GROUP BY user_id
) AS first_logins
WHERE DATEDIFF('2019-06-30', activity_date) < 90
GROUP BY activity_date;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and aggregation.
- **Space:** `O(n)` for the intermediate first-login table.
