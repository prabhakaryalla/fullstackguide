# 1303. Find the Team Size

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employee` table (`employee_id`, `team_id`), write a query that reports, for each employee, the size of the team they belong to.

### Schema

```
Employee: employee_id (PK), team_id
```

## Approach

Count how many employees share each `team_id` using a window function (or a self-join grouped by `team_id`), then attach that count to every employee row via the matching `team_id`.

## SQL Solution

```sql
SELECT employee_id,
       COUNT(*) OVER (PARTITION BY team_id) AS team_size
FROM Employee;
```

## Complexity

- **Time:** `O(n log n)` for the partitioned count.
- **Space:** `O(n)` for the result set.
