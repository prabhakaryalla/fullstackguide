# 1731. The Number of Employees Which Report to Each Employee

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employees` table (`employee_id`, `name`, `reports_to`, `age`), for every employee who has at least one direct report, return their id, name, the number of direct reports, and the average age of those reports (rounded to the nearest integer).

### Schema

```
Employees: employee_id, name, reports_to, age
```

## Approach

Self-join `Employees` to itself, matching each manager to the rows whose `reports_to` equals the manager's `employee_id`. Group by the manager and aggregate the count and rounded average age of the matched rows.

## SQL Solution

```sql
SELECT
    e.employee_id,
    e.name,
    COUNT(r.employee_id) AS reports_count,
    ROUND(AVG(r.age)) AS average_age
FROM Employees e
JOIN Employees r ON r.reports_to = e.employee_id
GROUP BY e.employee_id, e.name
ORDER BY e.employee_id;
```

## Complexity

- **Time:** `O(n log n)` for the join and grouping.
- **Space:** `O(n)`.
