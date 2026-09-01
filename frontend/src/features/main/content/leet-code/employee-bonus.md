# 577. Employee Bonus

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given an `Employee` table (`empId`, `name`, `supervisorId`, `salary`) and a `Bonus` table (`empId`, `bonus`), write a query to report the name and bonus of every employee whose bonus is less than 1000, including employees who have no bonus recorded at all.

### Schema

```
Employee: empId (PK), name, supervisorId, salary
Bonus: empId (FK), bonus
```

## Approach

Since employees without any bonus record must still be reported, use a `LEFT JOIN` from `Employee` to `Bonus` (an inner join would silently drop them). Filter to rows where the bonus is either `NULL` (no bonus recorded) or strictly less than `1000`.

## SQL Solution

```sql
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;
```

## Complexity

- **Time:** `O(n + m)` with an index on `Bonus.empId`, where `n` and `m` are the row counts of `Employee` and `Bonus`.
- **Space:** `O(n)` for the result set.
