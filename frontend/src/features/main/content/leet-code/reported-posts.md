# 1113. Reported Posts

**Difficulty:** Easy
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `Actions` table (`user_id`, `post_id`, `action_date`, `action`, `extra`) where `action` can be `view`, `like`, `share`, or `report`, and `extra` holds the report reason when `action = 'report'`, find the number of distinct posts reported for each reason on `2019-07-04`.

### Schema

```
Actions: user_id, post_id, action_date, action, extra
```

## Approach

Filter rows down to `report` actions on the target date, then group by the report reason (`extra`) and count distinct `post_id` values to avoid double-counting posts reported multiple times for the same reason.

## SQL Solution

```sql
SELECT extra AS report_reason, COUNT(DISTINCT post_id) AS report_count
FROM Actions
WHERE action = 'report' AND action_date = '2019-07-04'
GROUP BY extra;
```

## Complexity

- **Time:** `O(n)` for the scan and grouping.
- **Space:** `O(k)` for the distinct reasons, where `k` is the number of report reasons.
