# 1225. Report Contiguous Dates

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Failed` table (`fail_date`) and a `Succeeded` table (`success_date`) covering system status during 2019, produce a report of `(start_date, end_date, period_state)` periods where consecutive days sharing the same state (`failed` or `succeeded`) are merged into a single row, ordered by `start_date`.

### Schema

```
Failed: fail_date (PK)
Succeeded: success_date (PK)
```

## Approach

Combine both tables into one list of `(day, state)` rows restricted to 2019. Use the classic "gaps and islands" trick: within each state partition, subtract a per-partition, date-ordered row number (in days) from the actual date — consecutive days in the same state produce the same resulting "group key" date, since the row number increments in lockstep with the date. Grouping by `(state, group key)` then collapses each run of consecutive same-state days into one row spanning `MIN(day)` to `MAX(day)`.

## SQL Solution

```sql
WITH combined AS (
    SELECT fail_date AS day, 'failed' AS state
    FROM Failed
    WHERE fail_date BETWEEN '2019-01-01' AND '2019-12-31'

    UNION ALL

    SELECT success_date AS day, 'succeeded' AS state
    FROM Succeeded
    WHERE success_date BETWEEN '2019-01-01' AND '2019-12-31'
),
grouped AS (
    SELECT day, state,
           DATE_SUB(day, INTERVAL ROW_NUMBER() OVER (PARTITION BY state ORDER BY day) DAY) AS group_key
    FROM combined
)
SELECT MIN(day) AS start_date, MAX(day) AS end_date, state AS period_state
FROM grouped
GROUP BY state, group_key
ORDER BY start_date;
```

## Complexity

- **Time:** `O(n log n)` for the window-function ordering and final sort.
- **Space:** `O(n)` for the combined and grouped intermediates.
