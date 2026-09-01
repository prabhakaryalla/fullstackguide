# 2173. Longest Winning Streak

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Find the longest winning streak for each player. A winning streak is a consecutive sequence of wins without any losses in between.

### Schema

```sql
Matches table:
| player_id | match_date | result |

where result is either 'Win' or 'Loss'
```

## Approach

Use window functions to identify streaks:
1. Assign a group ID to each winning streak using running totals
2. Count the length of each streak
3. Find the maximum streak length for each player

## SQL Solution

```sql
WITH Streaks AS (
    SELECT 
        player_id,
        result,
        ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY match_date) - 
        ROW_NUMBER() OVER (PARTITION BY player_id, result ORDER BY match_date) AS streak_id
    FROM Matches
)
SELECT 
    player_id,
    MAX(CASE WHEN result = 'Win' THEN streak_length ELSE 0 END) AS longest_streak
FROM (
    SELECT 
        player_id,
        result,
        streak_id,
        COUNT(*) AS streak_length
    FROM Streaks
    GROUP BY player_id, result, streak_id
) AS StreakLengths
GROUP BY player_id;
```

## Complexity

- **Time:** O(n log n) for sorting by date
- **Space:** O(n) for intermediate results
