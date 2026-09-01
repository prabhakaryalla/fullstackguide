# 1809. Ad-Free Sessions

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Playback` table (`session_id`, `customer_id`, `start_time`, `end_time`) and an `Ads` table (`ad_id`, `customer_id`, `timestamp`), return the `session_id`s of sessions during which the same customer was never shown an ad (i.e., no ad timestamp for that customer falls within the session's time range).

### Schema

```
Playback: session_id, customer_id, start_time, end_time
Ads: ad_id, customer_id, timestamp
```

## Approach

Left join each playback session to any ad from the same customer whose `timestamp` falls within `[start_time, end_time]`. A session with no matching ad row will have `NULL` for the ad's columns after the join, so filtering on `Ads.ad_id IS NULL` isolates the ad-free sessions.

## SQL Solution

```sql
SELECT Playback.session_id
FROM Playback
LEFT JOIN Ads
  ON Playback.customer_id = Ads.customer_id
  AND Ads.timestamp BETWEEN Playback.start_time AND Playback.end_time
WHERE Ads.ad_id IS NULL;
```

## Complexity

- **Time:** `O(p * a)` in the worst case for the join, though indexes on `customer_id`/`timestamp` make it much faster in practice.
- **Space:** `O(p)` for the result set.
