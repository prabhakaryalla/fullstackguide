# Employees with Salary between 50,000 and 100,000

## Example

### Input: `employees`

| employee_id | employee_name | salary |
|---|---|---|
| 1 | Alice | 45000 |
| 2 | Ben | 50000 |
| 3 | Carla | 75000 |
| 4 | Dan | 100000 |
| 5 | Ella | 120000 |

### Expected Output

Alice (45000) and Ella (120000) fall outside the range.

| employee_id | employee_name | salary |
|---|---|---|
| 4 | Dan | 100000 |
| 3 | Carla | 75000 |
| 2 | Ben | 50000 |

## Solution

`BETWEEN` is inclusive at both ends.

```sql
SELECT employee_id, employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 100000
ORDER BY salary DESC;
```

## Tricky Interview Question

**Q: Does `BETWEEN 50000 AND 100000` include both values?**

**A:** Yes. `BETWEEN` includes the lower and upper boundaries.