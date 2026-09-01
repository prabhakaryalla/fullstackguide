# 512. Game Play Analysis II

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given an `Activity` table (`player_id`, `device_id`, `event_date`, `games_played`), write a query to report the device that was used by each player for their first login.

### Schema

```
Activity: player_id, device_id, event_date, games_played
Primary key: (player_id, event_date)
```

## Approach

First determine each player's earliest `event_date` (their first login), then join that back to the `Activity` table on both `player_id` and that earliest date to retrieve the corresponding `device_id`.

## SQL Solution

```sql
SELECT a.player_id, a.device_id
FROM Activity a
JOIN (
    SELECT player_id, MIN(event_date) AS first_login
    FROM Activity
    GROUP BY player_id
) first_login ON a.player_id = first_login.player_id
    AND a.event_date = first_login.first_login;
```

## Complexity

- **Time:** `O(n)` with an index on `(player_id, event_date)`.
- **Space:** `O(p)`, where `p` is the number of distinct players.
