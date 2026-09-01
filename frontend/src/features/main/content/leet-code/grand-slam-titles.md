# 1783. Grand Slam Titles

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Players` table (`player_id`, `player_name`) and a `Championships` table (one row per year, with columns `Wimbledon`, `Fr_open`, `US_open`, `Au_open` each holding the winning `player_id`), return, for every player who has won at least one Grand Slam title, their id, name, and total number of Grand Slam titles won.

### Schema

```
Players: player_id, player_name
Championships: year, Wimbledon, Fr_open, US_open, Au_open
```

## Approach

Unpivot the four tournament columns into a single column of winner ids using `UNION ALL`, then join that against `Players` and group by player to count total titles.

## SQL Solution

```sql
SELECT p.player_id, p.player_name, COUNT(*) AS grand_slams_count
FROM Players p
JOIN (
    SELECT Wimbledon AS player_id FROM Championships
    UNION ALL
    SELECT Fr_open FROM Championships
    UNION ALL
    SELECT US_open FROM Championships
    UNION ALL
    SELECT Au_open FROM Championships
) wins ON wins.player_id = p.player_id
GROUP BY p.player_id, p.player_name;
```

## Complexity

- **Time:** `O(n log n)` for the join and grouping.
- **Space:** `O(n)`.
