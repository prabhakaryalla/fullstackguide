# Compute Team Standings: Played, Won, Lost, Points

A classic SQL exercise: given a table of match results (two teams per row, one winner), compute a standings table — played, won, lost, and points — for every team. The trick is that each team can appear in either the `team_1` or `team_2` column, so you first need to "unpivot" the matches into one row per team per match.

## Example

### Input: `matches`

| id | team_1 | team_2 | winner |
|---|---|---|---|
| 1 | India | Australia | India |
| 2 | England | Sri Lanka | Sri Lanka |
| 3 | New Zealand | India | New Zealand |
| 4 | India | Sri Lanka | India |
| 5 | England | India | India |

### Expected Output

| team | played | won | lost | points |
|---|---|---|---|---|
| India | 4 | 3 | 1 | 6 |
| Sri Lanka | 2 | 1 | 1 | 2 |
| New Zealand | 1 | 1 | 0 | 2 |
| England | 2 | 0 | 2 | 0 |
| Australia | 1 | 0 | 1 | 0 |

(2 points per win, 0 for a loss — adjust the scoring rule to your needs.)

## Step 1 — Unpivot Into One Row Per Team Per Match

Each match involves two teams, but they're stored in separate columns. `UNION ALL` combines both perspectives into a single "team" column:

```sql
SELECT team_1 AS team, winner FROM matches
UNION ALL
SELECT team_2 AS team, winner FROM matches;
```

This produces one row per team, per match they played in — exactly what's needed to `GROUP BY team` next.

```mermaid
flowchart LR
    Matches["matches table\n(team_1, team_2, winner)"] --> Union["UNION ALL\n(team_1 as team) + (team_2 as team)"]
    Union --> AllTeams["all_teams\n(team, winner) — one row per team per match"]
    AllTeams --> Group["GROUP BY team"]
```

## Step 2 — Aggregate Played, Won, Lost, Points

```sql
WITH all_teams AS (
    SELECT team_1 AS team, winner FROM matches
    UNION ALL
    SELECT team_2 AS team, winner FROM matches
)
SELECT
    team,
    COUNT(*) AS played,
    COUNT(CASE WHEN team = winner THEN 1 END) AS won,
    COUNT(CASE WHEN team <> winner THEN 1 END) AS lost,
    COUNT(CASE WHEN team = winner THEN 1 END) * 2 AS points
FROM all_teams
GROUP BY team
ORDER BY points DESC, won DESC, team;
```

## Why COUNT(CASE ...) Instead of SUM(CASE ...)

```sql
COUNT(CASE WHEN team = winner THEN 1 END)  -- counts non-NULL results
SUM(CASE WHEN team = winner THEN 1 ELSE 0 END)  -- sums 1s and 0s
```

- Both produce the same result here, but `COUNT(CASE WHEN ... THEN 1 END)` relies on `COUNT` ignoring NULLs (the implicit `ELSE NULL`), while `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` is more explicit about the fallback. Either pattern is a standard, well-understood idiom for "conditional counting" in SQL.

## Alternative: Without a CTE

```sql
SELECT
    TeamName AS team,
    COUNT(*) AS played,
    SUM(CASE WHEN TeamName = winner THEN 1 ELSE 0 END) AS won,
    SUM(CASE WHEN TeamName <> winner THEN 1 ELSE 0 END) AS lost,
    SUM(CASE WHEN TeamName = winner THEN 2 ELSE 0 END) AS points
FROM (
    SELECT team_1 AS TeamName, winner FROM matches
    UNION ALL
    SELECT team_2 AS TeamName, winner FROM matches
) AS AllTeams
GROUP BY TeamName
ORDER BY points DESC, won DESC, team;
```

- Functionally identical to the CTE version — a `WITH` clause is purely for readability, naming the intermediate "all teams" result set instead of nesting it as a subquery.

## Common Mistake

Trying to compute `played`/`won`/`lost` directly from the original `matches` table without unpivoting first — this undercounts every team that appears in `team_2` for some matches and `team_1` for others, since a naive `GROUP BY team_1` only sees half of each team's matches.

## Summary

This is a two-step pattern that recurs constantly in SQL interviews: first reshape/unpivot data so each entity you want to aggregate by (here, a team) has one row per relevant event (here, a match), typically via `UNION ALL`; then aggregate with conditional counting (`COUNT(CASE WHEN ...)` or `SUM(CASE WHEN ...)`) to compute derived metrics like wins, losses, and points.
