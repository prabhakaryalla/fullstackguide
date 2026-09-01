# 1212. Team Scores in Football Tournament

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Teams` table (`team_id`, `team_name`) and a `Matches` table (`match_id`, `host_team`, `guest_team`, `host_goals`, `guest_goals`), report each team's total tournament points (win = `3`, draw = `1`, loss = `0`), sorted by points descending and `team_id` ascending for ties.

### Schema

```
Teams: team_id (PK), team_name
Matches: match_id (PK), host_team, guest_team, host_goals, guest_goals
```

## Approach

Left join `Teams` to `Matches` on either the host or guest side so every team appears even without matches. For each matched row, use a `CASE` expression to award `3` points for a win (as host or guest), `1` for a draw, and `0` for a loss, then sum across all of a team's matches; `COALESCE` covers teams with no matches at all.

## SQL Solution

```sql
SELECT t.team_id, t.team_name,
    COALESCE(SUM(
        CASE
            WHEN m.host_team = t.team_id AND m.host_goals > m.guest_goals THEN 3
            WHEN m.guest_team = t.team_id AND m.guest_goals > m.host_goals THEN 3
            WHEN m.host_team = t.team_id AND m.host_goals = m.guest_goals THEN 1
            WHEN m.guest_team = t.team_id AND m.host_goals = m.guest_goals THEN 1
            ELSE 0
        END
    ), 0) AS num_points
FROM Teams t
LEFT JOIN Matches m ON t.team_id IN (m.host_team, m.guest_team)
GROUP BY t.team_id, t.team_name
ORDER BY num_points DESC, t.team_id ASC;
```

## Complexity

- **Time:** `O(n log n)` for the final ordering, where `n` is the number of teams.
- **Space:** `O(n)` for the grouped result.
