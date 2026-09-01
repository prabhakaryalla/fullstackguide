# 1127. User Purchase Platform

**Difficulty:** Hard
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Spending` table (`user_id`, `spend_date`, `platform`, `amount`) where `platform` is `mobile` or `desktop`, report for every date that appears in the table and for each of `mobile`, `desktop`, and `both`, the total amount spent and the number of distinct users whose spending that day matches that platform category (a user counts as `both` if they made purchases on both platforms that day).

### Schema

```
Spending: user_id, spend_date, platform, amount
```

## Approach

First aggregate each user's spending per day, split into mobile and desktop totals. Classify each user-day as `mobile`, `desktop`, or `both` depending on which totals are non-zero. Then, for every date and every one of the three categories, left-join against the classified data (so categories with no matching users still report zero) and aggregate the total amount and user count.

## SQL Solution

```sql
WITH DailyPlatform AS (
    SELECT spend_date, user_id,
           SUM(CASE WHEN platform = 'mobile' THEN amount ELSE 0 END) AS mobile_amount,
           SUM(CASE WHEN platform = 'desktop' THEN amount ELSE 0 END) AS desktop_amount,
           SUM(amount) AS total_amount
    FROM Spending
    GROUP BY spend_date, user_id
),
Classified AS (
    SELECT spend_date,
           CASE
               WHEN mobile_amount > 0 AND desktop_amount > 0 THEN 'both'
               WHEN mobile_amount > 0 THEN 'mobile'
               ELSE 'desktop'
           END AS platform,
           total_amount
    FROM DailyPlatform
)
SELECT d.spend_date,
       p.platform,
       COALESCE(SUM(c.total_amount), 0) AS total_amount,
       COUNT(c.spend_date) AS total_users
FROM (SELECT DISTINCT spend_date FROM Spending) d
CROSS JOIN (SELECT 'mobile' AS platform UNION SELECT 'desktop' UNION SELECT 'both') p
LEFT JOIN Classified c ON c.spend_date = d.spend_date AND c.platform = p.platform
GROUP BY d.spend_date, p.platform
ORDER BY d.spend_date, p.platform;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and joins.
- **Space:** `O(n)` for the intermediate classified table.
