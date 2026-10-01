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

## Performance vs. Window Functions

Both a lateral join and a window function (`ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)`) can solve "top-N per group" — the choice is about execution strategy, not just syntax:

- **Window function**: typically computed in a **single pass** over the whole dataset (one sort per partition key, then rank within each partition) — usually the better choice when N is a significant fraction of each group's rows, or when the full result set fits comfortably in a single scan/sort.
- **Lateral join**: executes the inner query **once per outer row** — for a genuinely small, fixed N (like "top 3"), the database can often use an index to grab just those 3 rows per customer very cheaply (an Index Seek + `TOP`/`LIMIT`, no full sort of that customer's orders needed), which can outperform a window function's need to rank the *entire* partition just to keep the top few.
- **Rule of thumb**: for small, fixed top-N per group with a supporting index, lateral joins/`CROSS APPLY` are often faster; for ranking a large fraction of each group or needing multiple different rank types in one query, window functions are usually clearer and just as fast. Always confirm with the actual execution plan for your data volume rather than assuming.

## Tricky / Follow-up Questions

**Q: When is a lateral join better than a window function?**

**A:** It can be clear and efficient for a small top-N lookup per parent. For large sets, compare it with `ROW_NUMBER` using an execution plan.