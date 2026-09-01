# 601. Human Traffic of Stadium

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `stadium` table (`id`, `visit_date`, `people`), write a query to display the records with three or more consecutive rows (ordered by `id`) where the number of `people` is greater than or equal to 100.

### Schema

```
stadium: id (PK), visit_date, people
```

## Approach

Filter to only rows meeting the `people >= 100` threshold, then use the difference between each row's `id` and its row number (via `ROW_NUMBER()`) as a grouping key — consecutive `id`s with the threshold met produce the same difference value, forming contiguous groups. Keep only groups with 3 or more rows, since those represent runs of at least 3 consecutive qualifying days.

## SQL Solution

```sql
WITH Filtered AS (
    SELECT *, id - ROW_NUMBER() OVER (ORDER BY id) AS grp
    FROM stadium
    WHERE people >= 100
)
SELECT id, visit_date, people
FROM Filtered
WHERE grp IN (
    SELECT grp FROM Filtered GROUP BY grp HAVING COUNT(*) >= 3
)
ORDER BY id;
```

## Complexity

- **Time:** `O(n log n)` for the window function ordering.
- **Space:** `O(n)` for the filtered intermediate result.
