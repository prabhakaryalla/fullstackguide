# 615. Average Salary: Departments VS Company

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `salary` (`id`, `employee_id`, `amount`, `pay_date`) and `employee` (`employee_id`, `department_id`) tables, write a query to compare, for each month and department, whether that department's average salary was `higher`, `lower`, or `same` compared to the whole company's average salary that month.

### Schema

```
salary: id (PK), employee_id (FK), amount, pay_date
employee: employee_id (PK), department_id
```

## Approach

Join salary records to employees to know each payment's department. Group by month and department to compute each department's average salary, then compare it against the overall company average for that same month (computed via a correlated subquery filtered to the same month), classifying the result with a `CASE` expression.

## SQL Solution

```sql
SELECT
    DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month,
    e.department_id,
    CASE
        WHEN AVG(s.amount) > (
            SELECT AVG(s2.amount)
            FROM salary s2
            WHERE DATE_FORMAT(s2.pay_date, '%Y-%m') = DATE_FORMAT(s.pay_date, '%Y-%m')
        ) THEN 'higher'
        WHEN AVG(s.amount) < (
            SELECT AVG(s2.amount)
            FROM salary s2
            WHERE DATE_FORMAT(s2.pay_date, '%Y-%m') = DATE_FORMAT(s.pay_date, '%Y-%m')
        ) THEN 'lower'
        ELSE 'same'
    END AS comparison
FROM salary s
JOIN employee e ON s.employee_id = e.employee_id
GROUP BY pay_month, e.department_id;
```

## Complexity

- **Time:** `O(n^2)` due to the correlated subqueries per group.
- **Space:** `O(n)` for the grouped intermediate result.
