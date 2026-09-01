# 511. Game Play Analysis I

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given an `Activity` table (`player_id`, `device_id`, `event_date`, `games_played`), write a query to report the first login date for each player.

### Schema

```
Activity: player_id, device_id, event_date, games_played
Primary key: (player_id, event_date)
```

## Approach

Group all activity rows by `player_id` and take the earliest `event_date` within each group using `MIN`.

## SQL Solution

```sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
```

## Complexity

- **Time:** `O(n)` with an index on `player_id`, where `n` is the number of activity rows.
- **Space:** `O(p)`, where `p` is the number of distinct players.
