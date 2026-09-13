# Index Seek versus Index Scan

An index seek goes directly to matching rows. An index scan reads many rows from the index. A scan is not always bad; it can be faster when the query needs a large part of the table.

```sql
CREATE INDEX ix_orders_status ON orders (status);

SELECT order_id, order_date
FROM orders
WHERE status = 'pending';
```

This `CREATE INDEX` syntax works in both SQL Server and PostgreSQL. The terminology in the execution plan differs: **SQL Server** shows `Index Seek` for a direct lookup and `Index Scan` for reading the whole index. **PostgreSQL** shows `Index Scan` for a lookup that uses the index and `Seq Scan` for reading the whole table; it has no separate "seek" term.

Some conditions stop the database from using a seek efficiently. Prefer `order_date >= DATE '2025-01-01'` instead of applying a function to `order_date`. A search such as `LIKE '%phone'` usually cannot use a normal index efficiently.

## Tricky Interview Questions

**Q: Is an index scan always a performance problem?**

**A:** No. A scan can be the best choice when the query needs many rows. Judge it using actual execution time and I/O.