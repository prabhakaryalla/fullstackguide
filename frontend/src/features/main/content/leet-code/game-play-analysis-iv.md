# 550. Game Play Analysis IV

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given an `Activity` table (`player_id`, `device_id`, `event_date`, `games_played`), write a query to report the fraction of players who logged in again on the day immediately after their first login, rounded to 2 decimal places.

### Schema

```
Activity: player_id, device_id, event_date, games_played
Primary key: (player_id, event_date)
```

## Approach

First determine each player's first login date. Then, using a left join back to `Activity` matching `player_id` and a date exactly one day after that first login, count how many players have such a matching row versus the total number of distinct players, and compute the ratio.

## SQL Solution

```sql
WITH FirstLogin AS (
    SELECT player_id, MIN(event_date) AS first_login
    FROM Activity
    GROUP BY player_id
)
SELECT
    ROUND(
        COUNT(DISTINCT a.player_id) / (SELECT COUNT(*) FROM FirstLogin),
        2
    ) AS fraction
FROM FirstLogin f
JOIN Activity a
    ON a.player_id = f.player_id
    AND a.event_date = DATE_ADD(f.first_login, INTERVAL 1 DAY);
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of activity rows.
- **Space:** `O(p)`, where `p` is the number of distinct players.
