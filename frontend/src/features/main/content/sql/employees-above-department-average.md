# Employees Earning More Than Their Department Average

## Example

### Input: `employees`

| employee_id | employee_name | department_id | salary |
|---|---|---|---|
| 1 | Alice | 10 | 90000 |
| 2 | Ben | 10 | 70000 |
| 3 | Carla | 20 | 60000 |
| 4 | Dan | 20 | 80000 |

### Expected Output

Department 10 average is 80000; department 20 average is 70000.

| employee_id | employee_name | department_id | salary |
|---|---|---|---|
| 1 | Alice | 10 | 90000 |
| 4 | Dan | 20 | 80000 |

## Solution

Compute each department average with a window function, then filter employees against it.

```sql
SELECT employee_id, employee_name, department_id, salary
FROM (
  SELECT e.*, AVG(salary) OVER (PARTITION BY department_id) AS department_average
  FROM employees AS e
) AS compared
WHERE salary > department_average;
```

## Tricky Interview Question

**Q: Why use a window function instead of `GROUP BY`?**

**A:** `GROUP BY` returns one row per department. The window function calculates the average while keeping each employee row.