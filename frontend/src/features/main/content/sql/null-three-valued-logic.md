# NULL and Three-Valued Logic

`NULL` means unknown or missing. It is not equal to zero, an empty string, or another `NULL`. Comparisons with `NULL` produce Unknown, not True or False.

```sql
SELECT employee_id, employee_name
FROM employees
WHERE manager_id IS NULL;
```

Use `IS NULL` and `IS NOT NULL`, never `= NULL`. Be careful with `NOT IN`: if its list contains `NULL`, the result can become Unknown for every row. `NOT EXISTS` is often safer.

```sql
SELECT c.customer_id
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1 FROM blocked_customers AS b
  WHERE b.customer_id = c.customer_id
);
```

## Tricky / Follow-up Questions

**Q: What does `NULL + 10` return?**

**A:** Usually `NULL`, because the result is still unknown. Use `COALESCE(value, 0)` when missing should mean zero.