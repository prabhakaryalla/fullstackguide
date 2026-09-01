# 3384. Team Dominance by Pass Success

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Table `Teams` holds `player_id` (primary key) and `team_name`.
Table `Passes` holds `pass_from`, `pass_to`, and `time_stamp` (format `mm:ss`, a match runs for 90 minutes split into two 45-minute halves: the first half covers `00:00` to `45:00`, the second half covers everything after).

A pass is *successful* if `pass_from` and `pass_to` belong to the same team, otherwise it is intercepted by the opposing team.

Define a team's **dominance** in a half as the number of successful passes it made in that half minus the number of passes it made that were intercepted by the opponent in that half.

Return the dominance of every team for every half in which it made at least one pass, ordered by `team_name`, then `half_number`.

### Schema
```
Teams(player_id INT PRIMARY KEY, team_name VARCHAR)
Passes(pass_from INT, pass_to INT, time_stamp VARCHAR)
```

## Approach
Join `Passes` twice against `Teams` to resolve the team name of both the passer (`from_team`) and the receiver (`to_team`), and classify the half from `time_stamp` with a `CASE` expression.

Each row then contributes `+1` to `from_team`'s dominance if `from_team = to_team` (successful pass) or `-1` otherwise (intercepted pass). Summing that signed value per `(from_team, half_number)` group gives the answer directly.

## SQL Solution

```sql
WITH PassDetails AS (
    SELECT
        p.time_stamp,
        t1.team_name AS from_team,
        t2.team_name AS to_team,
        CASE
            WHEN p.time_stamp BETWEEN '00:00' AND '45:00' THEN 1
            ELSE 2
        END AS half_number
    FROM Passes p
    JOIN Teams t1 ON p.pass_from = t1.player_id
    JOIN Teams t2 ON p.pass_to = t2.player_id
)
SELECT
    from_team AS team_name,
    half_number,
    SUM(CASE WHEN from_team = to_team THEN 1 ELSE -1 END) AS dominance
FROM PassDetails
GROUP BY from_team, half_number
ORDER BY team_name, half_number;
```

## Complexity

- **Time:** O(p log p + t), where p is the number of passes and t is the number of teams (sorting/grouping dominates).
- **Space:** O(p + t) for the joined intermediate rows.
