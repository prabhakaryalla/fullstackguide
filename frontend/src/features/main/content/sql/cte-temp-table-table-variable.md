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

## Tricky Interview Questions

**Q: Does a CTE always improve performance?**

**A:** No. A CTE mainly improves readability. The optimizer may inline it, so check the execution plan.