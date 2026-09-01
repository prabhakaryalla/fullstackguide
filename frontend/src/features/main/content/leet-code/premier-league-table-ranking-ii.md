# 3252. Premier League Table Ranking II

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Using the same team statistics as "Premier League Table Ranking", compute each team's total points, league position (rank, with ties sharing a rank), and additionally classify each team into one of three performance tiers based on their position relative to the total number of teams: the top third are "Tier 1," the middle third "Tier 2," and the bottom third "Tier 3."

### Schema
```sql
Create table If Not Exists TeamStats (team_id int, team_name varchar(50), wins int, draws int, losses int)
```

## Approach
First compute each team's points and rank exactly as before. Then compute two boundary thresholds representing the position cutoffs for the top 33% and top 67% of teams (using `CEIL(totalTeams * 0.33)` and `CEIL(totalTeams * 0.67)`). Finally, classify each team into Tier 1, 2, or 3 by comparing its rank position against these two boundary thresholds, and output the results ordered by points descending, with team name as a tiebreaker.

## SQL Solution
```sql
WITH
  TeamPoints AS (
    SELECT team_id, team_name, wins * 3 + draws AS points
    FROM TeamStats
  ),
  RankedTeams AS (
    SELECT *, RANK() OVER(ORDER BY points DESC) AS position
    FROM TeamPoints
  ),
  Tiers AS (
    SELECT
      CEIL(COUNT(*) * 0.33) AS tier1_bound,
      CEIL(COUNT(*) * 0.67) AS tier2_bound
    FROM RankedTeams
  )
SELECT
  RankedTeams.team_name,
  RankedTeams.points,
  RankedTeams.position,
  CASE
    WHEN RankedTeams.position <= Tiers.tier1_bound THEN 'Tier 1'
    WHEN RankedTeams.position <= Tiers.tier2_bound THEN 'Tier 2'
    ELSE 'Tier 3'
  END AS tier
FROM RankedTeams
CROSS JOIN Tiers
ORDER BY points DESC, team_name;
```

## Complexity
- Time: O(n log n) due to ranking
- Space: O(n)
