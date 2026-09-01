# 3236. CEO Subordinate Hierarchy

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A company's employee table stores each employee's manager (nullable, with null indicating the CEO). For every employee (excluding the CEO), determine their hierarchy level (1 for direct reports to the CEO, 2 for their reports, and so on) and their salary difference compared to the CEO's salary.

### Schema
```sql
Create table If Not Exists Employees (employee_id int, employee_name varchar(50), manager_id int, salary int)
```

## Approach
Use a recursive common table expression: the base case selects all employees whose manager is the CEO (identified as the employee with a null manager_id), assigning them hierarchy level 1. The recursive case joins the current hierarchy level results back to the employees table to find their direct reports, incrementing the hierarchy level by 1 each recursion. Separately, retrieve the CEO's salary. Finally, join the full hierarchy result with the CEO's salary to compute each employee's salary difference, and order by hierarchy level then employee id.

## SQL Solution
```sql
WITH RECURSIVE
  EmployeeHierarchy AS (
    SELECT
      employee_id,
      employee_name,
      salary,
      1 AS hierarchy_level
    FROM Employees
    WHERE manager_id = (
        SELECT employee_id
        FROM Employees
        WHERE manager_id IS NULL
      )
    UNION ALL
    SELECT
      Employees.employee_id,
      Employees.employee_name,
      Employees.salary,
      EmployeeHierarchy.hierarchy_level + 1
    FROM Employees
    INNER JOIN EmployeeHierarchy
      ON Employees.manager_id = EmployeeHierarchy.employee_id
  ),
  Ceo AS (
    SELECT salary
    FROM Employees
    WHERE manager_id IS NULL
  )
SELECT
  EmployeeHierarchy.employee_id AS subordinate_id,
  EmployeeHierarchy.employee_name AS subordinate_name,
  EmployeeHierarchy.hierarchy_level,
  EmployeeHierarchy.salary - Ceo.salary AS salary_difference
FROM EmployeeHierarchy
CROSS JOIN Ceo
ORDER BY hierarchy_level, employee_id;
```

## Complexity
- Time: O(n log n) due to the recursive traversal
- Space: O(n)
