# 185. Department Top Three Salaries

**Difficulty:** Hard
**Category:** SQL, Database

## Problem

Given an `Employee` table (`id`, `name`, `salary`, `departmentId`) and a `Department` table (`id`, `name`), find the top three **distinct** salaries for each department (fewer than three if a department has fewer distinct salary values).

### Schema

```
Employee: id (PK), name, salary, departmentId (FK)
Department: id (PK), name
```

## Approach

For each employee, compute how many *distinct* salaries in their department are strictly greater than their own — that count is effectively their dense rank minus one within the department. Keep only employees where this count is less than 3 (i.e., dense rank 1, 2, or 3). A window function (`DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)`) expresses this more directly where supported.

## SQL Solution

```sql
SELECT
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (
    SELECT COUNT(DISTINCT e2.salary)
    FROM Employee e2
    WHERE e2.departmentId = e.departmentId AND e2.salary > e.salary
) < 3;
```

## Complexity

- **Time:** `O(n^2)` worst case for the correlated subquery (or `O(n log n)` using a window-function equivalent).
- **Space:** `O(n)` for the result set.
