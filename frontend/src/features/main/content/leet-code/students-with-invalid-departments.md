# 1350. Students With Invalid Departments

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Departments` (`id`, `name`) and `Students` (`id`, `name`, `department_id`), write a query that finds all students whose `department_id` doesn't correspond to any existing department.

### Schema

```
Departments: id (PK), name
Students: id (PK), name, department_id
```

## Approach

Compare each student's `department_id` against the set of valid department ids and keep only the students whose id isn't present in that set.

## SQL Solution

```sql
SELECT s.id, s.name
FROM Students s
WHERE s.department_id NOT IN (SELECT id FROM Departments);
```

## Complexity

- **Time:** `O(n + m)` given an index on `Departments.id`.
- **Space:** `O(m)` for the department id set.
