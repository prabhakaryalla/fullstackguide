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

## Reading a Plan: Common Operators

| Operator | What it means | When it shows up |
|---|---|---|
| **Table/Seq Scan** | Reads every row in the table | No usable index for the filter — often a red flag on a large table |
| **Index Seek** | Jumps directly to matching rows using an index (fast) | The filtered column has a suitable index and selectivity is good |
| **Index Scan** | Reads the entire index in order, not just matching rows | Useful for satisfying an `ORDER BY`, or when the filter matches a large fraction of rows |
| **Nested Loop Join** | For each row in the outer input, probes the inner input | Good when one side is small; bad (slow) when both sides are large |
| **Hash Join** | Builds an in-memory hash table from one side, probes it with the other | Good for large, unsorted inputs; costs memory — can "spill" to disk if the hash table doesn't fit |
| **Merge Join** | Walks two already-sorted inputs in lockstep | Efficient when both inputs are already sorted (e.g. by index) on the join key |

## Worked Example: A Missing Index Causing a Scan

```sql
SELECT * FROM orders WHERE customer_id = 42;
```

Without an index on `customer_id`, the optimizer has no choice but a **Table/Seq Scan** — reading every row in `orders` to find the ones matching `customer_id = 42`, which gets linearly slower as the table grows. Adding `CREATE INDEX idx_orders_customer ON orders(customer_id);` lets the optimizer switch to an **Index Seek**, which reads roughly `O(log n)` pages to find the matching rows plus the matching rows themselves — this is the single most common "why is this query slow" diagnosis: check whether the plan shows a scan where a seek should be possible.

## Tricky Interview Questions

**Q: Is the cheapest estimated plan always the fastest plan?**

**A:** No. Estimates can be wrong. Compare the plan with actual row counts and timings.