# 1097. Game Play Analysis V

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Activity` table (`player_id`, `device_id`, `event_date`, `games_played`), for every install date, report the number of players who installed the game that day, and the fraction of them (rounded to 2 decimals) who logged in again exactly one day after installing (the "Day 1 retention" rate).

### Schema

```
Activity: player_id, device_id, event_date, games_played
```

## Approach

First determine each player's install date as their earliest `event_date` (a grouped subquery). Then, for each install date, count the distinct players who installed that day, and separately count how many of those players have an activity row exactly one day later than their install date (a `LEFT JOIN` back onto `Activity` matching `event_date = install_dt + 1 day`). Dividing the second count by the first (with rounding) gives the retention rate per install date.

## SQL Solution

```sql
WITH FirstLogin AS (
    SELECT player_id, MIN(event_date) AS install_dt
    FROM Activity
    GROUP BY player_id
)
SELECT
    f.install_dt,
    COUNT(DISTINCT f.player_id) AS installs,
    ROUND(
        COUNT(DISTINCT CASE WHEN a.event_date = f.install_dt + INTERVAL 1 DAY THEN a.player_id END) * 1.0
        / COUNT(DISTINCT f.player_id),
    2) AS Day1_retention
FROM FirstLogin f
LEFT JOIN Activity a ON f.player_id = a.player_id
GROUP BY f.install_dt;
```

## Complexity

- **Time:** `O(n)` for the grouping and join scans.
- **Space:** `O(players)` for the install-date lookup.
