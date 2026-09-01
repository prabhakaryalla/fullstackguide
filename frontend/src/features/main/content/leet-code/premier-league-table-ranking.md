# 3246. Premier League Table Ranking

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table tracks each football team's season statistics, including wins and draws. Compute each team's total points (3 per win, 1 per draw), and their league position (rank) based on points, with ties sharing the same rank.

### Schema
```sql
Create table If Not Exists TeamStats (team_id int, team_name varchar(50), wins int, draws int, losses int)
```

## Approach
First compute each team's total points using the standard scoring formula. Then apply a ranking window function ordered by points descending, assigning the same rank to teams with equal points (using standard competition ranking semantics where ties share a rank and the next rank accounts for the tie group size). Finally, output the results ordered by points descending, with team name as a tiebreaker.

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
  )
SELECT team_id, team_name, points, position
FROM RankedTeams
ORDER BY points DESC, team_name;
```

## Complexity
- Time: O(n log n) due to ranking
- Space: O(n)
