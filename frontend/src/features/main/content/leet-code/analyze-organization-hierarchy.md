# 3482. Analyze Organization Hierarchy

**Difficulty:** Hard
**Category:** SQL, Database

## Problem
Table `Employees` has columns `employee_id`, `employee_name`, `manager_id` (`NULL` for the CEO), and `salary`.

Build the organization hierarchy and, for every employee, report:
- `level`: 1 for the CEO, incrementing by 1 for each level below.
- `team_size`: the number of subordinates (direct and indirect), 0 if none.
- `budget`: the sum of the salaries of all subordinates plus the employee's own salary.

Order the result by `level` ascending, then `budget` descending, then `employee_name` ascending.

## Approach
Use a recursive common table expression to walk down from the CEO (`manager_id IS NULL`) assigning increasing levels to every descendant. Use a second recursive CTE to compute, for every employee, the full set of subordinates (direct and indirect) by walking down from each employee, then aggregate the subordinate count and salary sum per employee. Join the two results together and sort as required.

## SQL Solution

```sql
WITH RECURSIVE
  EmployeeHierarchy AS (
    SELECT
      employee_id,
      employee_name,
      manager_id,
      salary,
      1 AS level
    FROM Employees
    WHERE manager_id IS NULL
    UNION ALL
    SELECT
      e.employee_id,
      e.employee_name,
      e.manager_id,
      e.salary,
      eh.level + 1
    FROM Employees e
    INNER JOIN EmployeeHierarchy eh
      ON e.manager_id = eh.employee_id
  ),
  Subordinates AS (
    SELECT manager_id, employee_id, salary
    FROM Employees
    WHERE manager_id IS NOT NULL
    UNION ALL
    SELECT s.manager_id, e.employee_id, e.salary
    FROM Employees e
    INNER JOIN Subordinates s
      ON e.manager_id = s.employee_id
  ),
  TeamSizeAndBudget AS (
    SELECT
      e.employee_id,
      COUNT(DISTINCT s.employee_id) AS team_size,
      IFNULL(SUM(s.salary), 0) + e.salary AS total_budget
    FROM Employees e
    LEFT JOIN Subordinates s
      ON e.employee_id = s.manager_id
    GROUP BY e.employee_id, e.salary
  )
SELECT
  eh.employee_id,
  eh.employee_name,
  eh.level,
  IFNULL(tsb.team_size, 0) AS team_size,
  IFNULL(tsb.total_budget, eh.salary) AS budget
FROM EmployeeHierarchy eh
LEFT JOIN TeamSizeAndBudget tsb
  ON eh.employee_id = tsb.employee_id
ORDER BY
  eh.level,
  budget DESC,
  eh.employee_name;
```

## Complexity

- **Time:** O(n^2) in the worst case for the recursive subordinate expansion, where n is the number of employees
- **Space:** O(n^2) in the worst case
