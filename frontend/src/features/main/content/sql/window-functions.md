# Window Functions and Ranking

## Example

### Input: `employees`

| employee_id | department_id | salary |
|---|---|---|
| 1 | 10 | 90000 |
| 2 | 10 | 90000 |
| 3 | 10 | 80000 |
| 4 | 20 | 70000 |

### Expected Output

Employees 1 and 2 tie for the top salary in department 10. `RANK` gives them both rank 1 and skips to rank 3 for employee 3. `ROW_NUMBER` always increments regardless of ties.

| employee_id | department_id | salary | row_number | salary_rank |
|---|---|---|---|---|
| 1 | 10 | 90000 | 1 | 1 |
| 2 | 10 | 90000 | 2 | 1 |
| 3 | 10 | 80000 | 3 | 3 |
| 4 | 20 | 70000 | 1 | 1 |

## Solution

A window function calculates using related rows but keeps every original row. `PARTITION BY` defines each group, and `ORDER BY` defines the order inside that group.

```sql
SELECT employee_id, department_id, salary,
       ROW_NUMBER() OVER (
         PARTITION BY department_id ORDER BY salary DESC
       ) AS row_number,
       RANK() OVER (
         PARTITION BY department_id ORDER BY salary DESC
       ) AS salary_rank
FROM employees;
```

`ROW_NUMBER` always uses different numbers, `RANK` leaves gaps after ties, and `DENSE_RANK` does not leave gaps. Window functions help with top-N results, duplicate removal, running totals, and comparing rows.

## Tricky Interview Questions

**Q: Can a window function be used directly in `WHERE`?**

**A:** Usually no. Put the window query in a CTE or subquery, then filter the result outside it.