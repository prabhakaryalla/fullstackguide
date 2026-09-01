# 1789. Primary Department for Each Employee

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employee` table (`employee_id`, `department_id`, `primary_flag`), employees belonging to only one department implicitly have that as their primary department even if not flagged; employees in multiple departments have exactly one marked with `primary_flag = 'Y'`. Return each employee's primary department.

### Schema

```
Employee: employee_id, department_id, primary_flag
```

## Approach

Two cases can be combined with `UNION`: employees who appear in exactly one row (grouped by `employee_id` with a count of `1`), and employees whose row is explicitly flagged `'Y'`.

## SQL Solution

```sql
SELECT employee_id, department_id
FROM Employee
GROUP BY employee_id
HAVING COUNT(*) = 1
UNION
SELECT employee_id, department_id
FROM Employee
WHERE primary_flag = 'Y';
```

## Complexity

- **Time:** `O(n log n)` for the grouping and union.
- **Space:** `O(n)`.
