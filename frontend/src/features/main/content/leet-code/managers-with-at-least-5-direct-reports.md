# 570. Managers with at Least 5 Direct Reports

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given an `Employee` table (`id`, `name`, `department`, `managerId`), write a query to report the names of managers who have at least 5 direct reports.

### Schema

```
Employee: id (PK), name, department, managerId
```

## Approach

Group all employees by their `managerId` and filter to groups with a count of 5 or more direct reports. Then match those manager IDs back to the `Employee` table to retrieve their names.

## SQL Solution

```sql
SELECT e.name
FROM Employee e
WHERE e.id IN (
    SELECT managerId
    FROM Employee
    GROUP BY managerId
    HAVING COUNT(*) >= 5
);
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of employees.
- **Space:** `O(n)` for the grouped intermediate result.
