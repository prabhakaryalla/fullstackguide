# 1873. Calculate Special Bonus

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employees` table (`employee_id`, `name`, `salary`), calculate a bonus for every employee: their `salary` if `employee_id` is odd and their `name` does not start with `'M'`, otherwise `0`. Order by `employee_id`.

### Schema

```
Employees: employee_id, name, salary
```

## Approach

Use a `CASE` expression that checks `employee_id % 2 = 1` and `name NOT LIKE 'M%'` together, returning `salary` when both hold and `0` otherwise, then sort by `employee_id`.

## SQL Solution

```sql
SELECT
    employee_id,
    CASE
        WHEN employee_id % 2 = 1 AND name NOT LIKE 'M%' THEN salary
        ELSE 0
    END AS bonus
FROM Employees
ORDER BY employee_id;
```

## Complexity

- **Time:** `O(n log n)` for the final sort.
- **Space:** `O(n)` for the result set.
