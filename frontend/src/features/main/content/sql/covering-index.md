# Covering Indexes and Index Selectivity

A covering index contains all columns needed by a query. The database can answer the query from the index without reading the main table. Selectivity means how much a column reduces the number of matching rows.

```sql
CREATE INDEX ix_orders_customer_date
ON orders (customer_id, order_date)
INCLUDE (total_amount, status);

SELECT order_date, total_amount, status
FROM orders
WHERE customer_id = 42
  AND order_date >= DATE '2025-01-01';
```

Indexes make reads faster, but they use storage and make writes slower because the index must also be updated. Check the workload and execution plan before adding one.

## Tricky Interview Questions

**Q: Should every column have an index?**

**A:** No. Too many indexes slow writes and waste storage. Index columns used often in filters, joins, and ordering after checking the workload.