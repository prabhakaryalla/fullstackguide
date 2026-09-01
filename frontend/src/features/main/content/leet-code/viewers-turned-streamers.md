# 2995. Viewers Turned Streamers

**Difficulty:** Hard
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table `UserActivity` records every viewing and streaming session on a platform: `user_id`, `activity_type` (`'watch'` or `'stream'`), `stream_id` (the id of the streamer being watched, only set when `activity_type = 'watch'`), and `timestamp`. Write a solution that, for each streamer, counts the number of distinct viewers who watched that streamer's stream *before* the viewer's own very first `'stream'` activity — i.e. viewers who were inspired to become streamers themselves only after watching that streamer. Return `streamer_id` and `num_viewers_turned_streamers`, ordered by `streamer_id` ascending. Only include streamers whose count is greater than `0`.

### Schema

```sql
Create table If Not Exists UserActivity (user_id int, activity_type enum('watch', 'stream'), stream_id int, timestamp int)
```

## Approach
First compute each user's first `'stream'` timestamp with a `GROUP BY`/`MIN` aggregation. Then join that back to the `'watch'` rows: a watch event counts toward the watched streamer's total only if it happened strictly before the viewer's own first stream. Group the qualifying watch events by `stream_id` and count distinct viewers.

## SQL Solution

```sql
WITH FirstStream AS (
    SELECT user_id, MIN(timestamp) AS first_stream_time
    FROM UserActivity
    WHERE activity_type = 'stream'
    GROUP BY user_id
)
SELECT
    ua.stream_id AS streamer_id,
    COUNT(DISTINCT ua.user_id) AS num_viewers_turned_streamers
FROM UserActivity ua
JOIN FirstStream fs ON fs.user_id = ua.user_id
WHERE ua.activity_type = 'watch'
  AND ua.timestamp < fs.first_stream_time
GROUP BY ua.stream_id
ORDER BY streamer_id;
```

## Complexity

- **Time:** O(n log n), dominated by the aggregations and join, where n is the number of rows in `UserActivity`.
- **Space:** O(n) for the intermediate `FirstStream` result and grouping.
