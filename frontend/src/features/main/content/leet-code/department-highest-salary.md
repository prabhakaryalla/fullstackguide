# 184. Department Highest Salary

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given an `Employee` table (`id`, `name`, `salary`, `departmentId`) and a `Department` table (`id`, `name`), find the employee(s) with the highest salary in each department.

### Schema

```
Employee: id (PK), name, salary, departmentId (FK)
Department: id (PK), name
```

## Approach

For each department, compute the maximum salary (a grouped subquery), then join employees back against that per-department maximum to find every employee matching it (there can be ties). Join to `Department` at the end to report the department name instead of its id.

## SQL Solution

```sql
SELECT
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE e.salary = (
    SELECT MAX(e2.salary)
    FROM Employee e2
    WHERE e2.departmentId = e.departmentId
);
```

## Complexity

- **Time:** `O(n)` with an index on `Employee.departmentId`, where `n` is the employee count.
- **Space:** `O(n)` for the result set.
