# 1709. Biggest Window Between Visits

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Visits` table (`user_id`, `visit_date`), for each user find the largest "window" (in days) between two consecutive visits, treating today's date as an implicit final visit if it is later than the user's last recorded visit.

### Schema

```
Visits: user_id, visit_date
```

## Approach

For every visit row, compute the next visit date for the same user using `LEAD` ordered by `visit_date`, defaulting to `CURRENT_DATE` when there is no later visit. The window size is the day difference; take the maximum per user.

## SQL Solution

```sql
SELECT
    user_id,
    MAX(DATEDIFF(next_date, visit_date)) AS biggest_window
FROM (
    SELECT
        user_id,
        visit_date,
        COALESCE(LEAD(visit_date) OVER (PARTITION BY user_id ORDER BY visit_date), CURRENT_DATE) AS next_date
    FROM Visits
) AS t
GROUP BY user_id;
```

## Complexity

- **Time:** `O(n log n)` for the window-function sort.
- **Space:** `O(n)`.
