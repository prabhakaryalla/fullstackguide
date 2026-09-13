# Query Optimizer and Execution Plans

The query optimizer chooses how to run a query. It compares indexes, joins, sorting, table size, and available memory, then chooses the plan it expects to be fastest.

### SQL Server

```sql
SET STATISTICS IO, TIME ON;

SELECT o.order_id, c.customer_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
WHERE o.order_date >= '2025-01-01';
```

Enable **Include Actual Execution Plan** in SSMS to see estimated versus actual rows, operators, and cost for each step.

### PostgreSQL

```sql
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE '2025-01-01';
```

Check estimated rows versus actual rows, scans, joins, sorts, memory spills, and total time. A big difference often means that statistics are old or inaccurate.

## Tricky Interview Questions

**Q: Is the cheapest estimated plan always the fastest plan?**

**A:** No. Estimates can be wrong. Compare the plan with actual row counts and timings.