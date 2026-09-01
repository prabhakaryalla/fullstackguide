# 1075. Project Employees I

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Project` table (`project_id`, `employee_id`) and an `Employee` table (`employee_id`, `name`, `experience_years`), write a query to report the average experience years of all employees for each project, rounded to 2 decimal places.

### Schema

```
Project: project_id, employee_id (FK)
Employee: employee_id (PK), name, experience_years
```

## Approach

Join `Project` to `Employee` on `employee_id` to attach each project member's experience, then group by `project_id` and average the `experience_years` values, rounding the result.

## SQL Solution

```sql
SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;
```

## Complexity

- **Time:** `O(n)` for the join and grouping scan.
- **Space:** `O(projects)` for the grouped result.
