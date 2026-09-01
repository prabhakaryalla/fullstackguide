# 1875. Group Employees of the Same Salary

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employees` table (`employee_id`, `name`, `salary`), group every employee who shares their salary with at least one other employee into a `team_id` (salaries assigned team ids in ascending order of salary), excluding employees whose salary is unique. Order by `team_id`, then `employee_id`.

### Schema

```
Employees: employee_id, name, salary
```

## Approach

Use a window `COUNT(employee_id) OVER (PARTITION BY salary)` to know how many employees share each salary, and keep only rows where that count is greater than `1`. Assign `team_id` using `DENSE_RANK() OVER (ORDER BY salary)` so salaries map to consecutive team numbers in ascending order.

## SQL Solution

```sql
WITH EmployeesWithCountPerSalary AS (
    SELECT
        *,
        COUNT(employee_id) OVER (PARTITION BY salary) AS count_per_salary
    FROM Employees
)
SELECT
    employee_id,
    name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary) AS team_id
FROM EmployeesWithCountPerSalary
WHERE count_per_salary > 1
ORDER BY team_id, employee_id;
```

## Complexity

- **Time:** `O(n log n)` for the window functions.
- **Space:** `O(n)` for the intermediate CTE.
