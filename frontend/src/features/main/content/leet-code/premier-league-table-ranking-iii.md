# 3322. Premier League Table Ranking III

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Using the same team statistics as "Premier League Table Ranking", compute each team's total points and league position (rank, with ties sharing a rank), and additionally classify each team into a qualification zone based on its absolute position: the top 4 teams qualify for the "Champions League", the next 2 for the "Europa League", the bottom 3 are in the "Relegation" zone, and everyone else is "Mid-table".

### Schema
```sql
Create table If Not Exists TeamStats (team_id int, team_name varchar(50), wins int, draws int, losses int)
```

## Approach
Compute points and rank exactly as in the earlier problems in the series. Also compute the total number of teams with a window function so the bottom-3 boundary can be expressed relative to the league size. Finally, classify each team's zone with a `CASE` expression comparing its rank against the fixed top boundaries and the size-relative bottom boundary, and output ordered by points descending with team name as a tiebreaker.

## SQL Solution

```sql
WITH
  TeamPoints AS (
    SELECT team_id, team_name, wins * 3 + draws AS points
    FROM TeamStats
  ),
  RankedTeams AS (
    SELECT *,
      RANK() OVER(ORDER BY points DESC) AS position,
      COUNT(*) OVER() AS total_teams
    FROM TeamPoints
  )
SELECT
  team_name,
  points,
  position,
  CASE
    WHEN position <= 4 THEN 'Champions League'
    WHEN position <= 6 THEN 'Europa League'
    WHEN position > total_teams - 3 THEN 'Relegation'
    ELSE 'Mid-table'
  END AS zone
FROM RankedTeams
ORDER BY points DESC, team_name;
```

## Complexity

- **Time:** O(n log n) due to ranking
- **Space:** O(n)
