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

## How the Optimizer Actually Estimates: Histograms

Databases maintain **statistics** on column value distributions — commonly a **histogram** dividing a column's observed values into buckets with a row-count estimate per bucket, so the optimizer can estimate "how many rows have `region = 'west'`" without scanning the table. These statistics are built by sampling the table periodically (auto-updated after enough rows change, or manually via `ANALYZE`/`UPDATE STATISTICS`) — if a large batch load or bulk delete happens right after statistics were last refreshed, the histogram is now stale relative to the true data, and estimates drift until the next refresh.

**Why correlated columns fool the estimator**: independently, a histogram might say `status = 'pending'` matches 10% of rows and `region = 'west'` matches 20% of rows. The default assumption (absent extended/multi-column statistics) is that these are **independent**, so the combined filter `status='pending' AND region='west'` is estimated at `10% × 20% = 2%` of rows. But if pending orders are disproportionately concentrated in the west region (a real-world correlation), the true match rate might be 15% — 7.5x higher than estimated — leading the optimizer to under-provision memory or pick a Nested Loop Join expecting few rows, when a Hash Join would have been better for the actual volume. Modern databases (SQL Server's "extended statistics", PostgreSQL's `CREATE STATISTICS` with dependency/ndistinct options) let you explicitly tell the optimizer about known column correlations to fix this.

## Tricky / Follow-up Questions

**Q: How do you fix a cardinality estimate problem?**

**A:** Refresh statistics, create useful indexes or extended statistics where supported, rewrite expressions, and test with representative values.