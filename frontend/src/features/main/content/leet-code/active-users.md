# 1454. Active Users

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Logins` table (`id`, `login_date`), a user is "active" on a given day if they logged in on that day and on each of the previous four consecutive days (5 consecutive days total, counting distinct login dates). Report the `id` and `login_date` for every such qualifying day, ordered by `id` then `login_date`.

### Schema

```
Logins: (id, login_date) (PK)
```

## Approach

Self-join the `Logins` table on matching `id`, pairing each login date with every other login date from the same user within a `0`-to-`4` day window (inclusive) before it. Group by `id` and the later `login_date`, and keep only groups where exactly 5 distinct dates fall within that window — meaning there were logins on all 5 consecutive days ending on that date.

## SQL Solution

```sql
SELECT DISTINCT l1.id, l1.login_date
FROM Logins l1, Logins l2
WHERE l1.id = l2.id
  AND DATEDIFF(l1.login_date, l2.login_date) BETWEEN 0 AND 4
GROUP BY l1.id, l1.login_date
HAVING COUNT(DISTINCT l2.login_date) = 5
ORDER BY id, login_date;
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the self-join, though an index on `(id, login_date)` keeps it efficient in practice.
- **Space:** `O(n)` for the grouped result.
