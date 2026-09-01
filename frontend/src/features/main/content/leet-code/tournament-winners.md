# 1194. Tournament Winners

**Difficulty:** Hard
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Players` table (`player_id`, `group_id`) and a `Matches` table (`match_id`, `first_player`, `second_player`, `first_score`, `second_score`), find the winner of each group — the player with the highest total score across all their matches, breaking ties by the smallest `player_id`.

### Schema

```
Players: player_id, group_id
Matches: match_id, first_player, second_player, first_score, second_score
```

## Approach

Unpivot `Matches` into one row per player-per-match score using a `UNION ALL` of the "first player" and "second player" perspectives. Sum each player's total score (defaulting to `0` for players with no matches via a left join), then rank players within each group by total score descending and `player_id` ascending, keeping only the top-ranked player per group.

## SQL Solution

```sql
WITH PlayerScores AS (
    SELECT first_player AS player_id, first_score AS score FROM Matches
    UNION ALL
    SELECT second_player AS player_id, second_score AS score FROM Matches
),
TotalScores AS (
    SELECT p.player_id, p.group_id, COALESCE(SUM(ps.score), 0) AS total_score
    FROM Players p
    LEFT JOIN PlayerScores ps ON p.player_id = ps.player_id
    GROUP BY p.player_id, p.group_id
),
Ranked AS (
    SELECT player_id, group_id, total_score,
           ROW_NUMBER() OVER (
               PARTITION BY group_id
               ORDER BY total_score DESC, player_id ASC
           ) AS rn
    FROM TotalScores
)
SELECT group_id, player_id
FROM Ranked
WHERE rn = 1;
```

## Complexity

- **Time:** `O(n log n)` for the partitioned ranking.
- **Space:** `O(n)` for the intermediate tables.
