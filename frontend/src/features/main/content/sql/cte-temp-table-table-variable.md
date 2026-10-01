# CTEs, Temporary Tables, and Table Variables

A CTE is a named query used by one statement. A temporary table lasts longer, can have indexes, and is useful when the same result is reused. Table variables are convenient for small temporary results, but their behavior depends on the database.

```sql
WITH recent_orders AS (
  SELECT * FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
)
SELECT customer_id, COUNT(*)
FROM recent_orders
GROUP BY customer_id;
```

Use a temporary table when you need an index, statistics, or reuse. Do not assume that a CTE is stored separately; check the execution plan.

### SQL Server

```sql
CREATE TABLE #recent_orders (customer_id BIGINT, order_count INT);

INSERT INTO #recent_orders
SELECT customer_id, COUNT(*)
FROM orders
WHERE order_date >= DATEADD(day, -30, CURRENT_TIMESTAMP)
GROUP BY customer_id;

-- A table variable is convenient for small, short-lived result sets
DECLARE @top_customers TABLE (customer_id BIGINT, order_count INT);
```

### PostgreSQL

```sql
CREATE TEMP TABLE recent_orders AS
SELECT customer_id, COUNT(*) AS order_count
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY customer_id;
```

SQL Server table variables (`DECLARE @t TABLE (...)`) have no direct PostgreSQL equivalent; a temp table or CTE is used instead.

## Why the Choice Affects the Execution Plan

- **CTE**: the optimizer commonly **inlines** the CTE's definition directly into the outer query, as if you'd pasted the subquery in place — meaning a CTE referenced multiple times can be **re-evaluated multiple times** (not automatically cached/materialized) unless the database specifically supports materialized CTEs. Always check the execution plan rather than assuming "it's a CTE, so it must be computed once."
- **Temp table**: because it's a real (if temporary) table, the database can build **statistics and indexes** on it — valuable when the same intermediate result is scanned/joined repeatedly, since the optimizer can make good cardinality estimates and use an index instead of re-scanning.
- **Table variable (SQL Server specific)**: historically, the optimizer **always assumes a table variable has exactly 1 row** for cardinality estimation purposes (older SQL Server versions; newer versions with "table variable deferred compilation" improve this) — regardless of how many rows it actually holds. This can produce badly wrong plans (e.g. a Nested Loop Join chosen because the optimizer thinks the table variable side is tiny, when it actually holds 100,000 rows) — a table variable is fine for genuinely small, short-lived sets, but is a common hidden cause of "why did this query suddenly get slow" when someone puts a large result set into one.

## Tricky Interview Questions

**Q: Does a CTE always improve performance?**

**A:** No. A CTE mainly improves readability. The optimizer may inline it, so check the execution plan.