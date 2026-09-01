# 1767. Find the Subtasks That Did Not Execute

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Tasks` table (`task_id`, `subtasks_count`) and an `Executed` table (`task_id`, `subtask_id`), for every task find the subtask numbers (from `1` to `subtasks_count`) that were never executed.

### Schema

```
Tasks: task_id, subtasks_count
Executed: task_id, subtask_id
```

## Approach

Generate a sequence of numbers up to the largest `subtasks_count` using a recursive CTE, join it against `Tasks` to expand every task into its full list of subtask numbers, then use a `LEFT JOIN` against `Executed` and keep only the rows with no match.

## SQL Solution

```sql
WITH RECURSIVE Numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM Numbers WHERE n < (SELECT MAX(subtasks_count) FROM Tasks)
)
SELECT t.task_id, nu.n AS subtask_id
FROM Tasks t
JOIN Numbers nu ON nu.n <= t.subtasks_count
LEFT JOIN Executed e ON e.task_id = t.task_id AND e.subtask_id = nu.n
WHERE e.task_id IS NULL;
```

## Complexity

- **Time:** `O(n * c)` where `c` is the maximum `subtasks_count`.
- **Space:** `O(n * c)`.
