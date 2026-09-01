# 1468. Calculate Salaries

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Salaries` table (`company_id`, `employee_id`, `employee_name`, `salary`), apply a tax rate per company based on that company's maximum salary: no tax if the max is below `1000`, `24%` tax if the max is below `10000`, otherwise `49%` tax. Return each employee's salary after tax, rounded to 2 decimal places.

### Schema

```
Salaries: (company_id, employee_id) (PK), employee_name, salary
```

## Approach

Compute each company's maximum salary using a window function partitioned by `company_id`, then apply the appropriate tax rate with a `CASE` expression based on that maximum, and round the taxed salary to two decimal places.

## SQL Solution

```sql
SELECT company_id, employee_id, employee_name,
    ROUND(
        salary * (1 - CASE
            WHEN max_salary < 1000 THEN 0
            WHEN max_salary < 10000 THEN 0.24
            ELSE 0.49
        END), 2
    ) AS salary
FROM (
    SELECT s.*, MAX(salary) OVER (PARTITION BY company_id) AS max_salary
    FROM Salaries s
) t;
```

## Complexity

- **Time:** `O(n log n)` for the windowed aggregation.
- **Space:** `O(n)` for the intermediate result.
