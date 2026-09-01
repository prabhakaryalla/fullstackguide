# 1435. Create a Session Bar Chart

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Sessions` table (`session_id`, `duration` in seconds), report the number of sessions falling into each of four fixed duration buckets: `[0-5>`, `[5-10>`, `[10-15>`, and `15 or more` (minutes), including buckets with zero sessions.

### Schema

```
Sessions: session_id (PK), duration
```

## Approach

Since every bucket must appear even if empty, compute each bucket's count independently with a conditional `SUM` over the whole table, then union the four single-row results together as fixed category labels.

## SQL Solution

```sql
SELECT '[0-5>' AS category, SUM(CASE WHEN duration < 300 THEN 1 ELSE 0 END) AS total
FROM Sessions
UNION ALL
SELECT '[5-10>', SUM(CASE WHEN duration >= 300 AND duration < 600 THEN 1 ELSE 0 END)
FROM Sessions
UNION ALL
SELECT '[10-15>', SUM(CASE WHEN duration >= 600 AND duration < 900 THEN 1 ELSE 0 END)
FROM Sessions
UNION ALL
SELECT '15 or more', SUM(CASE WHEN duration >= 900 THEN 1 ELSE 0 END)
FROM Sessions;
```

## Complexity

- **Time:** `O(n)` — four full scans of the `Sessions` table (or one, with a query planner that combines them).
- **Space:** `O(1)` for the four output rows.
