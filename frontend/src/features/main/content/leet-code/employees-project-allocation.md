# 3057. Employees Project Allocation

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find every project whose `workload` exceeds the average workload of all projects belonging to the employee's `team`. Return the employee id, project id, employee name, and project workload.

### Schema

```sql
Create table If Not Exists Employees (employee_id int, name varchar(20), team varchar(20))
Create table If Not Exists Project (project_id int, employee_id int, workload int)
```

`Employees` has one row per employee including their `team`; `Project` has one row per project assignment with its `workload`.

## Approach

Join `Project` to `Employees` on `employee_id` to attach each project to its team. Use a window function to compute the average `workload` per `team` alongside each row, then filter to rows whose own `workload` exceeds that team average.

## SQL Solution

```sql
WITH EmployeesWithAvgWorkload AS (
  SELECT
    Employees.employee_id,
    Employees.name AS employee_name,
    Project.project_id,
    Project.workload AS project_workload,
    AVG(Project.workload) OVER (PARTITION BY Employees.team) AS avg_team_workload
  FROM Project
  JOIN Employees
    ON Project.employee_id = Employees.employee_id
)
SELECT
  employee_id,
  project_id,
  employee_name,
  project_workload
FROM EmployeesWithAvgWorkload
WHERE project_workload > avg_team_workload
ORDER BY employee_id, project_id;
```

## Complexity

- Time: O(n log n) for the windowed aggregation and join, where n is the number of project rows.
- Space: O(n) for the intermediate joined/windowed rows.
