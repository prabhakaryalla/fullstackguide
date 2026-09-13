# Troubleshooting a Slow Production Query

Start with evidence. Capture the exact SQL and values, compare old and new execution plans, and check row counts, locks, waits, CPU, memory, disk activity, and recent releases. A query that became slow may have old statistics, more data, a bad plan, blocking, or unusual parameter values.

### SQL Server

```sql
SET STATISTICS IO, TIME ON;

SELECT *
FROM orders
WHERE customer_id = 42
  AND order_date >= DATEADD(day, -30, CURRENT_TIMESTAMP);
```

Compare the actual execution plan and `sys.dm_exec_query_stats` against the historical baseline.

### PostgreSQL

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE customer_id = 42
  AND order_date >= CURRENT_DATE - INTERVAL '30 days';
```

Fix the real cause: update statistics, add or change an index, rewrite a filter, return fewer columns, remove blocking, or correct the plan. Test with realistic values and data before deploying.

## Tricky Interview Questions

**Q: Should you add an index as soon as a query becomes slow?**

**A:** No. First check blocking, statistics, plan changes, data growth, and resource pressure. An index may improve one query while making writes slower.