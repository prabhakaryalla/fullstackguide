# 2175. The Change in Global Rankings

**Difficulty:** Medium
**Category:** Database

## Problem

Calculate how each team's ranking changes after a points update. Teams are ranked by total points in descending order.

### Schema

```sql
TeamPoints table:
| team_id | name | points |

PointsChange table:
| team_id | points_change |
```

## Approach

1. Calculate new points for each team after applying the change
2. Rank teams before and after the change
3. Compute the rank difference for each team

## SQL Solution

```sql
WITH OldRanks AS (
    SELECT 
        team_id,
        RANK() OVER (ORDER BY points DESC) AS old_rank
    FROM TeamPoints
),
NewPoints AS (
    SELECT 
        t.team_id,
        t.points + COALESCE(c.points_change, 0) AS new_points
    FROM TeamPoints t
    LEFT JOIN PointsChange c ON t.team_id = c.team_id
),
NewRanks AS (
    SELECT 
        team_id,
        RANK() OVER (ORDER BY new_points DESC) AS new_rank
    FROM NewPoints
)
SELECT 
    t.team_id,
    t.name,
    o.old_rank - n.new_rank AS rank_diff
FROM TeamPoints t
JOIN OldRanks o ON t.team_id = o.team_id
JOIN NewRanks n ON t.team_id = n.team_id
ORDER BY t.team_id;
```

## Complexity

- **Time:** O(n log n) for ranking operations
- **Space:** O(n) for intermediate results
