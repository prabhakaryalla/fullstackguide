# Nested Loop, Hash, and Merge Joins

A nested-loop join checks rows from one input against the other. It is good when the outer input is small and the inner side has an index. A hash join builds a hash table and is useful for large unsorted equality joins. A merge join walks two sorted inputs and can be efficient when both are already ordered.

### SQL Server

```sql
SET STATISTICS IO, TIME ON;

-- Small, selective outer input with an index on the inner side: favors a nested loop
SELECT o.order_id, c.customer_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
WHERE o.order_id = 100042;

-- Large equality join across most of both tables: favors a hash join
SELECT o.order_id, c.customer_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id;
```

View the actual execution plan in SSMS to see `Nested Loops`, `Hash Match`, or `Merge Join` operators.

### PostgreSQL

```sql
-- Small, selective outer input with an index on the inner side: favors a nested loop
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
WHERE o.order_id = 100042;

-- Large equality join across most of both tables: favors a hash join
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id;

-- Both inputs already sorted by the join key: favors a merge join
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
ORDER BY o.customer_id;
```

The optimizer chooses the algorithm using estimated row counts, indexes, sort cost, and memory. You normally improve the inputs and statistics rather than forcing a join type.

## Tricky / Follow-up Questions

**Q: Is a hash join always slower than a nested loop?**

**A:** No. A hash join can be much faster for large inputs. A nested loop is often better for a small selective lookup.