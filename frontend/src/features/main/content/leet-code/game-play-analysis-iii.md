# 534. Game Play Analysis III

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Activity` table (`player_id`, `device_id`, `event_date`, `games_played`), write a query to report, for each player and date, the total number of games played by that player up to and including that date.

### Schema

```
Activity: player_id, device_id, event_date, games_played
Primary key: (player_id, event_date)
```

## Approach

Use a window function to compute a running total: partition the rows by `player_id` so the accumulation resets per player, order each partition by `event_date`, and sum `games_played` over that ordered window to get a cumulative total up through each row's date.

## SQL Solution

```sql
SELECT
    player_id,
    event_date,
    SUM(games_played) OVER (
        PARTITION BY player_id
        ORDER BY event_date
    ) AS games_played_so_far
FROM Activity;
```

## Complexity

- **Time:** `O(n log n)` for the partitioned sort, where `n` is the number of activity rows.
- **Space:** `O(n)` for the result set.
