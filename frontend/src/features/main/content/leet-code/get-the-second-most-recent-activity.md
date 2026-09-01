# 1369. Get the Second Most Recent Activity

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `UserActivity` table (`username`, `activity`, `startDate`, `endDate`), write a query that reports each user's second most recent activity (by `startDate`); if a user has only ever logged one activity, report that single activity instead.

### Schema

```
UserActivity: username, activity, startDate, endDate
```

## Approach

Rank each user's activities by `startDate` descending, and also count how many activities each user has in total. Keep rows ranked second, or, when a user has exactly one activity, keep that single row as well.

## SQL Solution

```sql
WITH ranked AS (
    SELECT username, activity, startDate, endDate,
           RANK() OVER (PARTITION BY username ORDER BY startDate DESC) AS rnk,
           COUNT(*) OVER (PARTITION BY username) AS total
    FROM UserActivity
)
SELECT username, activity, startDate, endDate
FROM ranked
WHERE rnk = 2 OR total = 1;
```

## Complexity

- **Time:** `O(n log n)` for the per-user ranking.
- **Space:** `O(n)`.
