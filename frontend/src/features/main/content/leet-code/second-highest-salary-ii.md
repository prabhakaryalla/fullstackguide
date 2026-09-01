# 3338. Second Highest Salary II

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an `Employee` table with each employee's salary and department, find the second-highest distinct salary **within each department**. If a department has fewer than two distinct salaries, its result should be `null`.

### Schema
```sql
Create table If Not Exists Employee (id int, salary int, department_id int)
```

## Approach
For each department, correlate a subquery that deduplicates salaries with `DISTINCT`, orders them descending, and skips the first one with `LIMIT 1 OFFSET 1`. Because the subquery is scoped to the same `department_id`, it naturally returns `null` when a department has fewer than two distinct salaries.

## SQL Solution

```sql
SELECT
  e1.department_id,
  (SELECT DISTINCT salary
   FROM Employee e2
   WHERE e2.department_id = e1.department_id
   ORDER BY salary DESC
   LIMIT 1 OFFSET 1) AS second_highest_salary
FROM Employee e1
GROUP BY e1.department_id;
```

## Complexity

- **Time:** O(n log n) for the per-department sort, where `n` is the number of employees.
- **Space:** O(n)
