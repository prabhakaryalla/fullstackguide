# 181. Employees Earning More Than Their Managers

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given an `Employee` table (`id`, `name`, `salary`, `managerId`), write a query to find employees who earn more than their direct manager.

### Schema

```
Employee: id (PK), name, salary, managerId (nullable FK to Employee.id)
```

## Approach

Self-join the table: alias one copy as the employee and another as their manager, joining on `employee.managerId = manager.id`. Filter rows where the employee's salary exceeds the manager's salary.

## SQL Solution

```sql
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
```

## Complexity

- **Time:** `O(n)` with an index on `Employee.id`/`managerId`, where `n` is the row count.
- **Space:** `O(n)` worst case for the result set.
