# Find Employees without a Department

## Example

### Input: `employees`

| employee_id | employee_name | department_id |
|---|---|---|
| 1 | Alice | 10 |
| 2 | Ben | NULL |
| 3 | Carla | 20 |
| 4 | Dan | NULL |

### Input: `departments`

| department_id | department_name |
|---|---|
| 10 | Engineering |
| 20 | Sales |

### Expected Output

| employee_id | employee_name |
|---|---|
| 2 | Ben |
| 4 | Dan |

## Solution

A `LEFT JOIN` preserves employees whose department lookup does not match.

```sql
SELECT e.employee_id, e.employee_name
FROM employees AS e
LEFT JOIN departments AS d ON d.department_id = e.department_id
WHERE d.department_id IS NULL;
```

## Tricky Interview Question

**Q: Why is this a `LEFT JOIN` and not an `INNER JOIN`?**

**A:** An inner join removes employees without a match. A left join keeps them so they can be found.