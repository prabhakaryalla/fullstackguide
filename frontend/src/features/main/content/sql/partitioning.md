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

## Tricky Interview Questions

**Q: Does partitioning automatically improve every query?**

**A:** No. It helps mainly when the query filters on the partition column and unrelated partitions can be skipped.