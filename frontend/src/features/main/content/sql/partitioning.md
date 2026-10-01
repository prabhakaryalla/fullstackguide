# Table Partitioning and Partition Pruning

Partitioning splits one large table into smaller physical parts, often by date or tenant. Partition pruning lets the database skip parts that cannot contain the requested rows.

### SQL Server

```sql
CREATE PARTITION FUNCTION OrderDateRange (DATE)
AS RANGE RIGHT FOR VALUES ('2025-01-01', '2026-01-01');

CREATE PARTITION SCHEME OrderDateScheme
AS PARTITION OrderDateRange ALL TO ([PRIMARY]);

CREATE TABLE orders (
  order_id BIGINT,
  order_date DATE NOT NULL,
  total_amount DECIMAL(12, 2)
) ON OrderDateScheme (order_date);
```

### PostgreSQL

```sql
CREATE TABLE orders (
  order_id BIGINT,
  order_date DATE NOT NULL,
  total_amount DECIMAL(12, 2)
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2025 PARTITION OF orders
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

SQL Server separates the partition function (boundaries) from the partition scheme (filegroup mapping). PostgreSQL declares partitions directly as child tables of the parent.

Queries should filter on the partition column so pruning can happen. Partitioning helps with very large tables and removing old data, but it does not replace indexes.

## When Pruning Works vs. Doesn't

```sql
-- Pruning WORKS: the filter is directly on the partition column (order_date)
SELECT * FROM orders WHERE order_date >= '2025-06-01' AND order_date < '2025-07-01';
-- The database can determine from the partition boundaries alone that only the
-- "orders_2025" partition (or a narrower sub-range) could possibly match, and
-- skips scanning every other partition entirely.

-- Pruning DOES NOT WORK: the filter is on a different column (customer_id)
SELECT * FROM orders WHERE customer_id = 42;
-- customer_id isn't the partition key, so the database has no way to know which
-- partition(s) might contain matching rows — it must scan every partition.
```

## Maintenance Overhead

- Index maintenance (rebuilds, statistics updates) typically happens **per partition** — this can be an advantage (rebuild just the current month's partition instead of the whole table) or added operational complexity (more objects to manage, monitor, and keep consistent).
- **Partitioning is not a substitute for indexing** — a common mistake is partitioning a table and assuming it's now "fast," when queries that don't filter on the partition key still need a proper index within each partition to avoid scanning every row of every partition.
- **When it's premature optimization**: partitioning adds real operational complexity (partition maintenance jobs, boundary management as time passes) — it's usually not worth it until a table is large enough that a single index/vacuum/backup operation on the whole table becomes genuinely painful, or until you specifically need fast bulk deletion of old data (dropping a whole partition is far cheaper than a `DELETE` with a `WHERE` clause).

## Tricky Interview Questions

**Q: Does partitioning automatically improve every query?**

**A:** No. It helps mainly when the query filters on the partition column and unrelated partitions can be skipped.