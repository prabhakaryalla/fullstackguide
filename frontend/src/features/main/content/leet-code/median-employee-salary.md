# 569. Median Employee Salary

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employee` table (`Id`, `Company`, `Salary`), write a query to find the median salary of each company, returning all rows that qualify as the median (accounting for both odd and even employee counts).

### Schema

```
Employee: Id (PK), Company, Salary
```

## Approach

For each employee, compare their salary against every other employee in the same company. An employee's salary is a median exactly when at least half of the company's employees have a salary `<=` theirs, and at least half have a salary `>=` theirs — this self-join and conditional counting approach identifies the middle value(s) without needing window functions.

## SQL Solution

```sql
SELECT e1.Id, e1.Company, e1.Salary
FROM Employee e1, Employee e2
WHERE e1.Company = e2.Company
GROUP BY e1.Company, e1.Id, e1.Salary
HAVING SUM(CASE WHEN e2.Salary <= e1.Salary THEN 1 ELSE 0 END) >= COUNT(*) / 2
   AND SUM(CASE WHEN e2.Salary >= e1.Salary THEN 1 ELSE 0 END) >= COUNT(*) / 2
ORDER BY e1.Company;
```

## Complexity

- **Time:** `O(n^2)` due to the self-join across companies.
- **Space:** `O(n)` for the grouped intermediate result.
