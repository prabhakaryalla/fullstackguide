# Recursive CTEs and Hierarchical Data

## Example

### Input: `employees`

| employee_id | employee_name | manager_id |
|---|---|---|
| 1 | Alice | NULL |
| 2 | Ben | 1 |
| 3 | Carla | 1 |
| 4 | Dan | 2 |

### Expected Output

Alice has no manager and starts at level 0. Ben and Carla report to Alice (level 1). Dan reports to Ben (level 2).

| employee_id | employee_name | manager_id | level |
|---|---|---|---|
| 1 | Alice | NULL | 0 |
| 2 | Ben | 1 | 1 |
| 3 | Carla | 1 | 1 |
| 4 | Dan | 2 | 2 |

## Solution

A recursive CTE repeatedly runs a query. It is useful for manager hierarchies, folders, and category trees.

### SQL Server

```sql
WITH employee_tree AS (
  SELECT employee_id, employee_name, manager_id, 0 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT e.employee_id, e.employee_name, e.manager_id, t.level + 1
  FROM employees AS e
  JOIN employee_tree AS t ON e.manager_id = t.employee_id
)
SELECT *
FROM employee_tree
ORDER BY level, employee_id
OPTION (MAXRECURSION 100);
```

### PostgreSQL

```sql
WITH RECURSIVE employee_tree AS (
  SELECT employee_id, employee_name, manager_id, 0 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT e.employee_id, e.employee_name, e.manager_id, t.level + 1
  FROM employees AS e
  JOIN employee_tree AS t ON e.manager_id = t.employee_id
)
SELECT *
FROM employee_tree
ORDER BY level, employee_id;
```

SQL Server's `WITH` clause does not need a `RECURSIVE` keyword and limits recursion depth with `OPTION (MAXRECURSION n)` (default 100). PostgreSQL requires the `RECURSIVE` keyword and has no built-in depth limit, so an explicit stop condition matters more.

The first query is the starting rows. The second query finds their children. Stop conditions are important because a cycle can cause endless recursion.

## Tricky / Follow-up Questions

**Q: How do you prevent a cycle?**

**A:** Track visited IDs in the path and reject an ID that already exists in that path. Also enforce a maximum recursion depth.