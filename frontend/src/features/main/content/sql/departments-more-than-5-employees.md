# Find Departments with More Than 5 Employees

## Example

### Input: `departments`

| department_id | department_name |
|---|---|
| 10 | Engineering |
| 20 | Sales |

### Input: `employees`

| employee_id | employee_name | department_id |
|---|---|---|
| 1 | Alice | 10 |
| 2 | Ben | 10 |
| 3 | Carla | 10 |
| 4 | Dan | 10 |
| 5 | Ella | 10 |
| 6 | Frank | 10 |
| 7 | Grace | 20 |
| 8 | Hank | 20 |

### Expected Output

Engineering has 6 employees (> 5); Sales has only 2.

| department_id | department_name | employee_count |
|---|---|---|
| 10 | Engineering | 6 |

## Solution

Count employees per department and filter groups with `HAVING`.

```sql
SELECT d.department_id, d.department_name, COUNT(e.employee_id) AS employee_count
FROM departments AS d
JOIN employees AS e ON e.department_id = d.department_id
GROUP BY d.department_id, d.department_name
HAVING COUNT(e.employee_id) > 5;
```

## Tricky Interview Question

**Q: Why count `employee_id` instead of `*`?**

**A:** The left side may contain departments with no employees. Counting the employee key counts only real employee matches.