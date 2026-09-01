# 2339. All the Matches of the League

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to report all the possible matches of the league. Note that every two teams play two matches with each other, with one team being the home_team while the other is the away_team.

Return the result table ordered by `home_team`, `away_team`.

### Schema

```
Table: Teams
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| team_name   | varchar |
+-------------+---------+
team_name is the primary key for this table.
Each row contains the name of a team in the league.
```

### Example

```
Input:
Teams table:
+-----------+
| team_name |
+-----------+
| Leetcode  |
| NewYork   |
| Atlanta   |
+-----------+

Output:
+-----------+-----------+
| home_team | away_team |
+-----------+-----------+
| Atlanta   | Leetcode  |
| Atlanta   | NewYork   |
| Leetcode  | Atlanta   |
| Leetcode  | NewYork   |
| NewYork   | Atlanta   |
| NewYork   | Leetcode  |
+-----------+-----------+
```

## Approach

Perform a self-join (cross join) on the Teams table where the team names are different. This generates all pairs where one team is home and another is away, ensuring no team plays against itself.

## SQL Solution

```sql
SELECT 
    t1.team_name AS home_team,
    t2.team_name AS away_team
FROM Teams t1
CROSS JOIN Teams t2
WHERE t1.team_name != t2.team_name
ORDER BY home_team, away_team
```

## Complexity

- **Time:** O(n^2) where n is the number of teams
- **Space:** O(n^2) for the result set
