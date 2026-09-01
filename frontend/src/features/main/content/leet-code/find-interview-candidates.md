# 1811. Find Interview Candidates

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Contests` table (`contest_id`, `gold_medal`, `silver_medal`, `bronze_medal`) and a `Users` table (`user_id`, `mail`, `name`), find the names and emails of users who are possible interview candidates: either they won any medal in three or more **consecutive** contests, or they won the gold medal in three or more contests (not necessarily consecutive).

### Schema

```
Contests: contest_id, gold_medal, silver_medal, bronze_medal
Users: user_id, mail, name
```

## Approach

First unpivot each contest's three medal winners into a single `(user_id, contest_id)` table via `UNION ALL`. For each user, use `ROW_NUMBER()` ordered by `contest_id` and subtract it from `contest_id`; consecutive contest ids produce the same difference, so grouping by `(user_id, difference)` and counting rows `>= 3` identifies consecutive-medal winners. Separately, group `Contests` by `gold_medal` and keep users with `>= 3` gold wins. Union the two qualifying user id sets and join back to `Users` for the name/mail.

## SQL Solution

```sql
WITH UserToContest AS (
    SELECT gold_medal AS user_id, contest_id FROM Contests
    UNION ALL
    SELECT silver_medal AS user_id, contest_id FROM Contests
    UNION ALL
    SELECT bronze_medal AS user_id, contest_id FROM Contests
),
UserToContestWithGroupId AS (
    SELECT
        user_id,
        contest_id - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY contest_id) AS group_id
    FROM UserToContest
),
CandidateUserIds AS (
    SELECT user_id
    FROM UserToContestWithGroupId
    GROUP BY user_id, group_id
    HAVING COUNT(*) >= 3

    UNION DISTINCT

    SELECT gold_medal AS user_id
    FROM Contests
    GROUP BY gold_medal
    HAVING COUNT(*) >= 3
)
SELECT Users.name, Users.mail
FROM CandidateUserIds
INNER JOIN Users ON Users.user_id = CandidateUserIds.user_id;
```

## Complexity

- **Time:** `O(c log c)` where `c` is the number of contests, dominated by the window function and grouping.
- **Space:** `O(c)` for the intermediate CTEs.
