# 1077. Project Employees III

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Project` table (`project_id`, `employee_id`) and an `Employee` table (`employee_id`, `name`, `experience_years`), write a query to report, for each project, the most experienced employee(s) working on it. If multiple employees on a project tie for the most experience, report all of them.

### Schema

```
Project: project_id, employee_id (FK)
Employee: employee_id (PK), name, experience_years
```

## Approach

Join `Project` to `Employee` to know each project member's experience. Separately compute, per project, the maximum `experience_years` among its members. Filter the joined rows down to only those whose `(project_id, experience_years)` pair matches that project's maximum — naturally including every tied employee rather than picking just one.

## SQL Solution

```sql
SELECT p.project_id, p.employee_id
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
WHERE (p.project_id, e.experience_years) IN (
    SELECT p2.project_id, MAX(e2.experience_years)
    FROM Project p2
    JOIN Employee e2 ON p2.employee_id = e2.employee_id
    GROUP BY p2.project_id
);
```

## Complexity

- **Time:** `O(n)` for the join and grouping subquery.
- **Space:** `O(projects)` for the intermediate max-experience results.
