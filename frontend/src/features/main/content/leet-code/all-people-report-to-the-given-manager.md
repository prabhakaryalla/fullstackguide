# 1270. All People Report to the Given Manager

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employees` table (`employee_id`, `employee_name`, `manager_id`) where the head of the company reports to themselves (`manager_id == employee_id == 1`), return the ids of all employees who report — directly or indirectly — to the head of the company, excluding the head.

### Schema

```
Employees: employee_id (PK), employee_name, manager_id
```

## Approach

This is a transitive-closure traversal down the management hierarchy, naturally expressed as a recursive common table expression. The base case selects everyone reporting directly to employee `1` (excluding the head itself). The recursive case then repeatedly joins in employees whose manager is already known to report to the head, until no new employees are found.

## SQL Solution

```sql
WITH RECURSIVE reports AS (
    SELECT employee_id
    FROM Employees
    WHERE manager_id = 1 AND employee_id != 1

    UNION

    SELECT e.employee_id
    FROM Employees e
    JOIN reports r ON e.manager_id = r.employee_id
)
SELECT employee_id FROM reports;
```

## Complexity

- **Time:** `O(n * d)`, where `n` is the number of employees and `d` is the depth of the management hierarchy.
- **Space:** `O(n)` for the recursive result set.
