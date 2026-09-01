# 1378. Replace Employee ID With The Unique Identifier

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Employees` (`id`, `name`) and `EmployeeUNI` (`id`, `unique_id`), write a query that shows each employee's name alongside their unique id, using `null` if no unique id is assigned.

### Schema

```
Employees: id (PK), name
EmployeeUNI: id, unique_id
```

## Approach

Left join `Employees` to `EmployeeUNI` on `id` so that employees without a matching unique id still appear, with `unique_id` returned as `null`.

## SQL Solution

```sql
SELECT eu.unique_id, e.name
FROM Employees e
LEFT JOIN EmployeeUNI eu ON e.id = eu.id;
```

## Complexity

- **Time:** `O(n)` for the left join.
- **Space:** `O(n)` for the result set.
