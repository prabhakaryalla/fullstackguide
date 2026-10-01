# SQL Views: Simple, Updatable, and Their Limitations

A view is a saved SQL query that behaves like a virtual table — useful for simplifying complex queries, enforcing a consistent read interface, and restricting which columns/rows different users can see.

## Short Answer

A view stores a `SELECT` statement under a name; querying the view runs that underlying query. Some views are **updatable** (an `UPDATE`/`INSERT`/`DELETE` against the view modifies the underlying base table), but only when the view meets specific structural requirements — most complex views are read-only.

## Creating and Using a View

```sql
CREATE VIEW ActiveCustomers AS
SELECT CustomerId, Name, Email
FROM Customers
WHERE IsActive = 1;
```

```sql
SELECT * FROM ActiveCustomers WHERE Name LIKE 'A%';
```

- Querying `ActiveCustomers` is equivalent to running the underlying `SELECT` with your additional `WHERE` clause appended — the view itself stores no data; it's just a saved query definition (unless it's an **indexed/materialized view**, a different, storage-backed variant).

## Simple (Updatable) Views

```sql
CREATE VIEW EmployeeContact AS
SELECT EmployeeId, Name, Phone
FROM Employees;
```

```sql
UPDATE EmployeeContact SET Phone = '555-0100' WHERE EmployeeId = 1; -- updates the underlying Employees table directly
```

**A view is updatable when it:**
- Selects from a single base table (no joins).
- Doesn't use aggregate functions (`SUM`, `COUNT`, `AVG`, etc.).
- Doesn't use `GROUP BY`, `HAVING`, or `DISTINCT`.
- Doesn't use set operators (`UNION`, `INTERSECT`, `EXCEPT`).

## Limitations of Views

- Views built on **multiple tables** (joins) are generally **not** directly updatable — SQL Server doesn't know which underlying table an ambiguous column update should apply to.
- Views with aggregations, grouping, or `DISTINCT` can't be updated — there's no well-defined way to translate a change to an aggregated row back into specific base-table row changes.
- Views don't accept parameters (unlike stored procedures/table-valued functions) — a view's logic is fixed at creation time, though you can filter further with a `WHERE` clause when querying it.
- Performance depends entirely on the underlying query — a view doesn't inherently make a slow query fast (except for indexed/materialized views, which physically store results).

## Advantages of Using Views

- **Simplify complex queries** — hide a complicated multi-join query behind a simple `SELECT * FROM ViewName`.
- **Security/column restriction** — expose only specific columns (e.g., hide a `SocialSecurityNumber` column) or specific rows (via a `WHERE` clause) to users who only have permission on the view, not the underlying table.
- **Abstraction from schema changes** — if the underlying table structure changes, the view can sometimes be updated to preserve a consistent interface for existing queries/reports built against it.
- **Reusable business logic** — encapsulate a commonly-needed filtered/joined dataset once, instead of repeating the same complex query across many reports.

## Views Based on Other Views

```sql
CREATE VIEW ActivePremiumCustomers AS
SELECT * FROM ActiveCustomers WHERE Tier = 'Premium'; -- built on top of another view
```

- Supported, but layering views on views can make performance harder to reason about — each layer adds to the query the database engine ultimately has to optimize and execute.

## Dropping a Table with Dependent Views

- Attempting to `DROP TABLE` a table that has views depending on it doesn't automatically fail in all databases, but the dependent views become invalid ("broken") and will error when queried afterward — always check for dependent objects (`sys.sql_expression_dependencies` in SQL Server) before dropping a table.

## Common Mistake

Assuming any view can be used for `INSERT`/`UPDATE`/`DELETE` just because the syntax doesn't immediately error. Attempting to modify data through a non-updatable view (one with joins, aggregates, etc.) results in an error — always verify a view meets the simple/updatable criteria before relying on write access through it.

## Summary

A view is a saved, named query acting as a virtual table — simplifying complex queries and providing a controlled, restricted read (and sometimes write) interface over underlying tables. Only "simple" views (single table, no aggregation/grouping/set operators) support direct `UPDATE`/`INSERT`/`DELETE`; anything more complex is effectively read-only, requiring the underlying base tables to be modified directly instead.
