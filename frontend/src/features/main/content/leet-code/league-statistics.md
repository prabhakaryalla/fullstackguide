# 1841. League Statistics

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Teams` table (`team_id`, `team_name`) and a `Matches` table (`home_team_id`, `away_team_id`, `home_team_goals`, `away_team_goals`), compute for every team: number of matches played, total points (3 for a win, 1 for a draw, 0 for a loss), goals for, goals against, and goal difference. Order the results by points descending, then goal difference descending, then team name ascending.

### Schema

```
Teams: team_id, team_name
Matches: home_team_id, away_team_id, home_team_goals, away_team_goals
```

## Approach

Join `Matches` to `Teams` on either the home or away side so each match contributes one row per participating team. For each team's row, use `CASE` expressions to attribute the correct goals-for/against based on whether the team was home or away, to award 3/1/0 points based on the match outcome from that team's perspective, and to count the match as played. Aggregate with `SUM` grouped by team, then sort per the required order.

## SQL Solution

```sql
SELECT
    Teams.team_name,
    SUM(1) AS matches_played,
    SUM(CASE
        WHEN Teams.team_id = Matches.home_team_id AND Matches.home_team_goals > Matches.away_team_goals THEN 3
        WHEN Teams.team_id = Matches.away_team_id AND Matches.away_team_goals > Matches.home_team_goals THEN 3
        WHEN Matches.home_team_goals = Matches.away_team_goals THEN 1
        ELSE 0
    END) AS points,
    SUM(CASE WHEN Matches.home_team_id = Teams.team_id THEN Matches.home_team_goals ELSE Matches.away_team_goals END) AS goal_for,
    SUM(CASE WHEN Matches.home_team_id = Teams.team_id THEN Matches.away_team_goals ELSE Matches.home_team_goals END) AS goal_against,
    SUM(CASE WHEN Matches.home_team_id = Teams.team_id THEN Matches.home_team_goals - Matches.away_team_goals ELSE Matches.away_team_goals - Matches.home_team_goals END) AS goal_diff
FROM Matches
INNER JOIN Teams
    ON Matches.home_team_id = Teams.team_id OR Matches.away_team_id = Teams.team_id
GROUP BY Teams.team_id, Teams.team_name
ORDER BY points DESC, goal_diff DESC, Teams.team_name;
```

## Complexity

- **Time:** `O(m)` for the join and aggregation, where `m` is the number of matches.
- **Space:** `O(t)` for the per-team result rows.
