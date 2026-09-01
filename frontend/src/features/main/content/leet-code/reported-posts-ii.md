# 1132. Reported Posts II

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `Actions` table (`user_id`, `post_id`, `action_date`, `action`, `extra`) and a `Removals` table (`post_id`, `remove_date`), find the average daily percentage of removed posts among all reported posts, rounded to two decimal places.

### Schema

```
Actions: user_id, post_id, action_date, action, extra
Removals: post_id, remove_date
```

## Approach

For each date, compute the ratio of distinct reported posts that also appear in `Removals` to the total distinct reported posts on that date (via a left join). Averaging that daily ratio across all dates and converting to a percentage gives the final answer.

## SQL Solution

```sql
SELECT ROUND(AVG(removed_ratio) * 100, 2) AS average_daily_percent
FROM (
    SELECT a.action_date,
           COUNT(DISTINCT CASE WHEN r.post_id IS NOT NULL THEN a.post_id END) * 1.0 /
           COUNT(DISTINCT a.post_id) AS removed_ratio
    FROM Actions a
    LEFT JOIN Removals r ON a.post_id = r.post_id
    WHERE a.action = 'report'
    GROUP BY a.action_date
) daily;
```

## Complexity

- **Time:** `O(n log n)` for the join and grouping.
- **Space:** `O(n)` for the intermediate daily aggregates.
