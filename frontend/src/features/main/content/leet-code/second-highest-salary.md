# 176. Second Highest Salary

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given an `Employee` table (`id`, `salary`), write a query to find the second-highest distinct salary. If no second-highest salary exists, return `null`.

### Schema

```
Employee: id (PK), salary
```

## Approach

Using `LIMIT`/`OFFSET` directly on `salary DESC` would incorrectly treat duplicate top salaries as separate ranks, so first deduplicate with `DISTINCT` before ranking. Wrapping the result in a subquery (rather than just `LIMIT 1 OFFSET 1`) naturally yields `null` when fewer than two distinct salaries exist, satisfying the "no second highest" case automatically.

## SQL Solution

```sql
SELECT
    (SELECT DISTINCT salary
     FROM Employee
     ORDER BY salary DESC
     LIMIT 1 OFFSET 1) AS SecondHighestSalary;
```

## Complexity

- **Time:** `O(n log n)` for the sort, where `n` is the number of employees.
- **Space:** `O(n)` for the distinct/sort working set.
