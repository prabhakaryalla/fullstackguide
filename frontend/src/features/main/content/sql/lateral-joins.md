# LATERAL Joins and CROSS APPLY

A lateral join lets a subquery use columns from the row before it. PostgreSQL calls it `LATERAL`; SQL Server commonly calls the equivalent `CROSS APPLY`.

### SQL Server

```sql
SELECT c.customer_id, c.customer_name, recent.order_id, recent.order_date
FROM customers AS c
OUTER APPLY (
  SELECT TOP 3 order_id, order_date
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
  ORDER BY order_date DESC
) AS recent;
```

### PostgreSQL

```sql
SELECT c.customer_id, c.customer_name, recent.order_id, recent.order_date
FROM customers AS c
LEFT JOIN LATERAL (
  SELECT order_id, order_date
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
  ORDER BY order_date DESC
  FETCH FIRST 3 ROWS ONLY
) AS recent ON TRUE;
```

`CROSS APPLY` keeps only customers with at least one match; `OUTER APPLY` keeps every customer, the same way `LEFT JOIN LATERAL` does in PostgreSQL.

This returns the three newest orders for each customer. A normal subquery in `FROM` cannot normally refer to the outer customer row.

## Tricky / Follow-up Questions

**Q: When is a lateral join better than a window function?**

**A:** It can be clear and efficient for a small top-N lookup per parent. For large sets, compare it with `ROW_NUMBER` using an execution plan.