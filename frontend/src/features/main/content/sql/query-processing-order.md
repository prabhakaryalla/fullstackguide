# Logical Processing Order of a SQL Query

SQL is written in one order, but the database understands it in another order. This explains why a name created in `SELECT` usually cannot be used in `WHERE`: `WHERE` is processed first.

The logical order is: `FROM` and `JOIN`, `WHERE`, `GROUP BY`, `HAVING`, window functions, `SELECT`, `DISTINCT`, `ORDER BY`, and `LIMIT`/`FETCH`.

```sql
SELECT department_id, AVG(salary) AS average_salary
FROM employees
WHERE status = 'active'
GROUP BY department_id
HAVING AVG(salary) > 80000
ORDER BY average_salary DESC
FETCH FIRST 5 ROWS ONLY;
```

The database may physically run these steps in a different order to improve speed, but the final result must be the same.

## Concrete Example: Why an Alias Fails in WHERE

```sql
-- This FAILS: "average_salary" doesn't exist yet when WHERE is evaluated
SELECT department_id, AVG(salary) AS average_salary
FROM employees
WHERE average_salary > 80000  -- ERROR: column "average_salary" does not exist
GROUP BY department_id;
```

`WHERE` runs before `SELECT` in logical order, so the alias `average_salary` — created *by* `SELECT` — doesn't exist yet at the point `WHERE` is evaluated. Filtering on an aggregate requires `HAVING` (which runs after `GROUP BY`) instead, or wrapping the query in a subquery/CTE so the alias becomes a real column name in an outer query:

```sql
-- Fix 1: HAVING runs after GROUP BY, so the aggregate expression is available
SELECT department_id, AVG(salary) AS average_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 80000;

-- Fix 2: wrap in a CTE so "average_salary" becomes a real column for the outer query
WITH dept_avg AS (
  SELECT department_id, AVG(salary) AS average_salary
  FROM employees
  GROUP BY department_id
)
SELECT * FROM dept_avg WHERE average_salary > 80000;
```

## Tricky Interview Questions

**Q: Why cannot a `SELECT` alias usually be used in `WHERE`?**

**A:** `WHERE` is logically processed before `SELECT`. Use a subquery or CTE when you need to filter by the calculated name.