# 1978. Employees Whose Manager Left the Company

**Difficulty:** Easy
**Category:** Database

## Problem

`Table: Employees(employee_id, name, manager_id, salary)`. Return the ids of employees whose salary is strictly less than `30000` and whose manager has left the company (i.e., `manager_id` is not null but does not exist as an `employee_id` in the table), sorted in ascending order.

### Example

```
Input: Employees: (3,"Mila",9,60301), (11,"Antonella",null,31000), (13,"Emery",null,67084), (4,"Ethan",11,58000)
Output: (3)
Explanation: Employee 3's manager (9) does not exist in the table, and salary 60301 is NOT less than 30000, so actually 3 would not qualify unless salary is below 30000; only employees meeting both conditions are returned.
```

## Approach

Filter `Employees` for rows with `salary < 30000` and a non-null `manager_id`, then keep only those whose `manager_id` does not appear as an `employee_id` anywhere in the table (checked with `NOT IN` or a `LEFT JOIN ... WHERE ... IS NULL`), sorted ascending by `employee_id`.

```sql
SELECT e.employee_id
FROM Employees e
WHERE e.salary < 30000
  AND e.manager_id IS NOT NULL
  AND e.manager_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY e.employee_id;
```

## Complexity

- **Time:** `O(n log n)` — a subquery lookup per row plus the final sort.
- **Space:** `O(n)` for the set of employee ids used in the lookup.
