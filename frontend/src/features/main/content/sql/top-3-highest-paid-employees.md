# Get the Top 3 Highest-Paid Employees

## Example

### Input: `employees`

| employee_id | employee_name | salary |
|---|---|---|
| 1 | Alice | 120000 |
| 2 | Ben | 110000 |
| 3 | Carla | 110000 |
| 4 | Dan | 95000 |
| 5 | Ella | 90000 |

### Expected Output

Ben and Carla tie for rank 2, so `DENSE_RANK <= 3` includes both plus Dan at rank 3.

| employee_id | employee_name | salary |
|---|---|---|
| 1 | Alice | 120000 |
| 2 | Ben | 110000 |
| 3 | Carla | 110000 |
| 4 | Dan | 95000 |

## Solution

Use `DENSE_RANK` when ties at the third salary should all be included.

```sql
SELECT employee_id, employee_name, salary
FROM (
  SELECT e.*, DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
  FROM employees AS e
) AS ranked
WHERE salary_rank <= 3
ORDER BY salary DESC;
```

## Tricky Interview Question

**Q: Should you use `ROW_NUMBER` or `DENSE_RANK` for ties?**

**A:** Use `ROW_NUMBER` for exactly three employees. Use `DENSE_RANK` when all employees tied at the third salary should be included.