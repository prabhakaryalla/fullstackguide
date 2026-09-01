# 1965. Employees With Missing Information

**Difficulty:** Easy
**Category:** Database

## Problem

`Table: Employees(employee_id, name)` and `Table: Salaries(employee_id, salary)`. Return the ids of employees who are missing information — either their name (present in `Salaries` but not `Employees`) or their salary (present in `Employees` but not `Salaries`) — sorted in ascending order.

### Example

```
Input:
Employees: (2,"Crew"), (4,"Haven"), (5,"Kristian")
Salaries: (5,76071), (1,22517), (4,63539)
Output: (1),(2)
Explanation: Employee 1 has a salary but no name; employee 2 has a name but no salary.
```

## Approach

Take the full outer join (via `UNION`) of employee ids from both tables, then keep only the ids that do not appear in both tables (i.e., appear in exactly one of `Employees` or `Salaries`), sorted ascending.

```sql
SELECT employee_id
FROM (
    SELECT employee_id FROM Employees
    UNION ALL
    SELECT employee_id FROM Salaries
) combined
GROUP BY employee_id
HAVING COUNT(*) = 1
ORDER BY employee_id;
```

## Complexity

- **Time:** `O(n log n)` — dominated by the grouping/sort of combined ids.
- **Space:** `O(n)` for the combined intermediate table.
