# Parameter Sniffing and Plan Cache

Some databases reuse a compiled plan for parameterized queries. Parameter sniffing happens when the plan is optimized for the first parameter value but performs badly for a very different value.

### SQL Server

```sql
SELECT order_id, total_amount
FROM orders
WHERE status = @status;

-- @status = 'cancelled' matches 40 rows out of 5,000,000  -> an index seek is ideal
-- @status = 'completed' matches 4,800,000 rows            -> a full scan is ideal
```

The plan cache reuses the first compiled plan for later calls. Fixes include `OPTION (RECOMPILE)`, `OPTION (OPTIMIZE FOR ...)`, or splitting the query by status.

### PostgreSQL

```sql
PREPARE order_lookup (text) AS
SELECT order_id, total_amount FROM orders WHERE status = $1;

EXECUTE order_lookup('cancelled');
EXECUTE order_lookup('completed');
```

PostgreSQL plans the first five `EXECUTE` calls generically unless told otherwise; after that it may switch to a generic plan controlled by `plan_cache_mode`. Simple, unprepared queries are replanned every time and are less exposed to this problem.

If `'cancelled'` runs first, the cached plan uses an index seek. When the same plan is reused for `'completed'`, it seeks into the index 4.8 million times instead of scanning the table once. Investigate the plan and parameter values before changing code. Possible solutions include better statistics, a better index, recompilation, plan forcing, or separate query shapes, depending on the database.

## Tricky / Follow-up Questions

**Q: Is parameterization itself a problem?**

**A:** No. Parameterization protects against injection and supports plan reuse. The problem is that one plan may not suit all data distributions.