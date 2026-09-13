# Retrieve the Second Highest Salary

## Example

### Input: `employees`

| employee_id | employee_name | salary |
|---|---|---|
| 1 | Alice | 90000 |
| 2 | Ben | 95000 |
| 3 | Carla | 95000 |
| 4 | Dan | 80000 |

### Expected Output

The highest salary is 95000 (tied). The second-highest distinct salary is 90000.

| employee_id | employee_name | salary |
|---|---|---|
| 1 | Alice | 90000 |

## Solution

`DENSE_RANK` handles ties and returns every employee sharing the second-highest distinct salary.

```sql
SELECT employee_id, employee_name, salary
FROM (
  SELECT e.*, DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
  FROM employees AS e
) AS ranked
WHERE salary_rank = 2;
```

## Tricky Interview Question

**Q: What happens when two employees share the highest salary?**

**A:** `DENSE_RANK` still finds the second distinct salary and returns all employees who earn it.