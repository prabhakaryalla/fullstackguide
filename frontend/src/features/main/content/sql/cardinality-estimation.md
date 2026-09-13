# Cardinality Estimation

Cardinality estimation is the optimizer's prediction of how many rows each step will return. The prediction affects join order, join algorithm, memory grants, and parallelism.

### SQL Server

```sql
SET STATISTICS IO, TIME ON;

SELECT *
FROM orders
WHERE status = 'pending' AND region = 'west';
```

Compare `EstimateRows` versus `ActualRows` in the actual execution plan's operator properties.

### PostgreSQL

```sql
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE status = 'pending' AND region = 'west';

-- Plan output to compare:
-- Seq Scan on orders  (cost=0.00..1200.00 rows=100 width=64)
--                     (actual time=0.01..15.32 rows=104235 loops=1)
```

Here the optimizer expected 100 rows but the query actually returned over 100,000. A gap that large usually leads to a poor plan choice. Causes include stale statistics, correlated columns (`status` and `region` moving together), data skew, or expressions the optimizer cannot estimate well.

## Tricky / Follow-up Questions

**Q: How do you fix a cardinality estimate problem?**

**A:** Refresh statistics, create useful indexes or extended statistics where supported, rewrite expressions, and test with representative values.