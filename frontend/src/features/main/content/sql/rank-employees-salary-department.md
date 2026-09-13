# Rank Employees by Salary within Each Department

## Example

### Input: `employees`

| employee_id | employee_name | department_id | salary |
|---|---|---|---|
| 1 | Alice | 10 | 90000 |
| 2 | Ben | 10 | 80000 |
| 3 | Carla | 20 | 70000 |
| 4 | Dan | 20 | 70000 |

### Expected Output

Carla and Dan tie for rank 1 within department 20.

| employee_id | employee_name | department_id | salary | department_salary_rank |
|---|---|---|---|---|
| 1 | Alice | 10 | 90000 | 1 |
| 2 | Ben | 10 | 80000 | 2 |
| 3 | Carla | 20 | 70000 | 1 |
| 4 | Dan | 20 | 70000 | 1 |

## Solution

`PARTITION BY` restarts the salary ranking for every department.

```sql
SELECT employee_id, employee_name, department_id, salary,
       DENSE_RANK() OVER (
         PARTITION BY department_id ORDER BY salary DESC
       ) AS department_salary_rank
FROM employees
ORDER BY department_id, department_salary_rank;
```

## Tricky Interview Question

**Q: What does `PARTITION BY department_id` do?**

**A:** It starts a separate salary ranking for each department instead of ranking everyone together.