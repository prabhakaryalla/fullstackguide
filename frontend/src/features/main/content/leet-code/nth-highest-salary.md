# 177. Nth Highest Salary

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given an `Employee` table (`id`, `salary`) and an integer `N`, write a query (typically wrapped as a function/parameterized query) that returns the `N`-th highest distinct salary. If no such salary exists, return `null`.

### Schema

```
Employee: id (PK), salary
```

## Approach

Deduplicate salaries first with `DISTINCT`, order descending, then skip `N - 1` rows and take the next one (`OFFSET N - 1 LIMIT 1`). Wrapping the offset expression to guard against `N <= 0` avoids a negative offset error, and the outer subquery naturally returns `null` if fewer than `N` distinct salaries exist.

## SQL Solution

```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
    SET N = N - 1;
    RETURN (
        SELECT DISTINCT salary
        FROM Employee
        ORDER BY salary DESC
        LIMIT 1 OFFSET N
    );
END;
```

## Complexity

- **Time:** `O(n log n)` for the sort, where `n` is the number of employees.
- **Space:** `O(n)` for the distinct/sort working set.
