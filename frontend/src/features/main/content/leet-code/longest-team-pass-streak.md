# 3390. Longest Team Pass Streak

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Table `Teams` holds `player_id` (primary key) and `team_name`.
Table `Passes` holds `pass_from`, `pass_to`, and `time_stamp`, describing every pass made during a match, in chronological order.

A pass is *successful* if `pass_from` and `pass_to` belong to the same team; otherwise the opposing team intercepted it.

For each team, define a **pass streak** as a maximal run of consecutive successful passes made by that team (looking only at that team's own passes in time order -- an interception by the team breaks the streak).

Return, for every team that has at least one successful pass, the team's `team_name` and its `longest_streak`, ordered by `team_name`.

### Schema
```
Teams(player_id INT PRIMARY KEY, team_name VARCHAR)
Passes(pass_from INT, pass_to INT, time_stamp VARCHAR)
```

## Approach
Resolve each pass's origin team and whether it was successful (`from_team = to_team`). This is a classic "gaps and islands" problem: within each team's chronologically-ordered passes, we want the length of the longest consecutive run where `is_success = 1`.

The standard trick: compute `rn`, the row number of each pass ordered by time within its team, and `success_rn`, the row number ordered by time within the team *and* the `is_success` flag. For consecutive rows that share the same `is_success` value, `rn - success_rn` stays constant, so it identifies each maximal run ("island"). Filtering to `is_success = 1` rows, grouping by `(team_name, rn - success_rn)`, and counting rows per group gives the length of every successful streak; the max per team is the answer.

## SQL Solution

```sql
WITH TeamPasses AS (
    SELECT
        t1.team_name AS team_name,
        CASE WHEN t1.team_name = t2.team_name THEN 1 ELSE 0 END AS is_success,
        p.time_stamp
    FROM Passes p
    JOIN Teams t1 ON p.pass_from = t1.player_id
    JOIN Teams t2 ON p.pass_to = t2.player_id
),
Ordered AS (
    SELECT
        team_name,
        is_success,
        ROW_NUMBER() OVER (PARTITION BY team_name ORDER BY time_stamp) AS rn,
        ROW_NUMBER() OVER (PARTITION BY team_name, is_success ORDER BY time_stamp) AS success_rn
    FROM TeamPasses
),
Groups AS (
    SELECT team_name, (rn - success_rn) AS grp
    FROM Ordered
    WHERE is_success = 1
),
Streaks AS (
    SELECT team_name, COUNT(*) AS streak_length
    FROM Groups
    GROUP BY team_name, grp
)
SELECT team_name, MAX(streak_length) AS longest_streak
FROM Streaks
GROUP BY team_name
ORDER BY team_name;
```

## Complexity

- **Time:** O(p log p + t), where p is the number of passes and t is the number of teams (window-function sorts dominate).
- **Space:** O(p + t) for the intermediate CTE rows.
