# 3126. Server Utilization Time

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to compute the total number of full days that servers were "up" (in a `'start'`...`'stop'` session), summed across all servers.

### Schema

```sql
Create table If Not Exists Servers (server_id int, status_time datetime, session_status ENUM('start', 'stop'))
```

`Servers` records `'start'`/`'stop'` events per server over time.

## Approach

For every `'start'` event, use the window function `LEAD()` (partitioned by `server_id`, ordered by `status_time`) to find the timestamp of its matching next event (the corresponding `'stop'`). Compute the duration in seconds between each start and its paired next event, sum all such durations across every server, and convert the total from seconds to whole days by dividing by `86400` and flooring.

## SQL Solution

```sql
WITH ServerNeighbors AS (
  SELECT
    status_time,
    session_status,
    LEAD(status_time) OVER (
      PARTITION BY server_id
      ORDER BY status_time
    ) AS next_status_time
  FROM Servers
)
SELECT
  FLOOR(
    SUM(TIMESTAMPDIFF(SECOND, status_time, next_status_time)) / 86400
  ) AS total_uptime_days
FROM ServerNeighbors
WHERE ServerNeighbors.session_status = 'start';
```

## Complexity

- Time: O(n log n) for the windowed sort, where n is the number of server events.
- Space: O(n) for the intermediate windowed rows.
