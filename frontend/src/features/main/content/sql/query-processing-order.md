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

## Tricky Interview Questions

**Q: Why cannot a `SELECT` alias usually be used in `WHERE`?**

**A:** `WHERE` is logically processed before `SELECT`. Use a subquery or CTE when you need to filter by the calculated name.