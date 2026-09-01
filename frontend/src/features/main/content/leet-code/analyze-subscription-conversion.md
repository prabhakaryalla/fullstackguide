# 3497. Analyze Subscription Conversion

**Difficulty:** Easy
**Category:** SQL, Database

## Problem
Table `UserActivity` records `user_id`, `activity_type` (`'free_trial'` or `'paid'`), and `activity_duration`.

For every user who has **both** a free trial activity and a paid activity (i.e., they converted from trial to paid), report their `user_id`, their average free-trial duration, and their average paid duration (both rounded to 2 decimal places). Order by `user_id`.

## Approach
Compute the average duration per user separately for `'free_trial'` rows and for `'paid'` rows. A user counts as "converted" only if they appear in both averaged sets, which an inner join naturally enforces. Join the two averages together on `user_id` and round each to 2 decimal places.

## SQL Solution

```sql
WITH
  FreeTrial AS (
    SELECT user_id, AVG(activity_duration) AS avg_free_trial_duration
    FROM UserActivity
    WHERE activity_type = 'free_trial'
    GROUP BY user_id
  ),
  Paid AS (
    SELECT user_id, AVG(activity_duration) AS avg_paid_duration
    FROM UserActivity
    WHERE activity_type = 'paid'
    GROUP BY user_id
  )
SELECT
  FreeTrial.user_id,
  ROUND(FreeTrial.avg_free_trial_duration, 2) AS trial_avg_duration,
  ROUND(Paid.avg_paid_duration, 2) AS paid_avg_duration
FROM FreeTrial
INNER JOIN Paid
  ON FreeTrial.user_id = Paid.user_id
ORDER BY FreeTrial.user_id;
```

## Complexity

- **Time:** O(n log n), where n is the number of activity rows
- **Space:** O(n)
