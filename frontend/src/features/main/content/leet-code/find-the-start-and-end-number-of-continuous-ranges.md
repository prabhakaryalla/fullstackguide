# 1285. Find the Start and End Number of Continuous Ranges

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Logs` table (`log_id`) with a sorted list of possibly non-consecutive ids, report the start and end id of every maximal run of consecutive integers present in the table.

### Schema

```
Logs: log_id (PK)
```

## Approach

Apply the classic "gaps and islands" trick: assign each row a sequential row number ordered by `log_id`, then compute `log_id - row_number`. For a run of truly consecutive ids, this difference stays constant throughout the run (since both the id and the row number increase by exactly `1` together), while it changes at every gap. Grouping by that constant difference collapses each consecutive run into a single row spanning its `MIN` and `MAX` id.

## SQL Solution

```sql
SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id
FROM (
    SELECT log_id, log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp
    FROM Logs
) AS numbered
GROUP BY grp
ORDER BY start_id;
```

## Complexity

- **Time:** `O(n log n)` for the window-function ordering and final sort.
- **Space:** `O(n)` for the intermediate numbered rows.
