# Table-Valued Functions and Cursors in SQL Server

Two SQL Server features that often get confused with stored procedures or regular loops: Table-Valued Functions (TVFs) return a table you can query directly, and cursors let you process query results row-by-row — usually as a last resort rather than a first choice.

## Short Answer

**Inline Table-Valued Functions (TVFs)** wrap a single `SELECT` statement and can be used directly inside another query, like a parameterized view. **Multi-statement TVFs** build a table variable through multiple statements before returning it, offering more logic flexibility but generally worse performance. **Cursors** iterate over a result set one row at a time — powerful but usually slower than an equivalent set-based query, and best avoided when a set-based alternative exists.

## Inline Table-Valued Functions

```sql
CREATE FUNCTION GetOrdersByCustomer (@customerId INT)
RETURNS TABLE
AS
RETURN
(
    SELECT OrderId, OrderDate, Total
    FROM Orders
    WHERE CustomerId = @customerId
);
```

```sql
SELECT * FROM GetOrdersByCustomer(42) WHERE Total > 100; -- usable directly inside a query, like a parameterized view
```

- Essentially a **parameterized view** — the query optimizer can inline it directly into the calling query's execution plan, generally giving performance close to writing the equivalent `SELECT` by hand.
- Like other functions (unlike stored procedures), inline TVFs do **not** support deferred name resolution — referencing a non-existent table fails immediately at creation time.

## Multi-Statement Table-Valued Functions

```sql
CREATE FUNCTION GetOrderSummary (@customerId INT)
RETURNS @Summary TABLE (TotalOrders INT, TotalSpent DECIMAL(10,2))
AS
BEGIN
    DECLARE @count INT = (SELECT COUNT(*) FROM Orders WHERE CustomerId = @customerId);
    DECLARE @total DECIMAL(10,2) = (SELECT SUM(Total) FROM Orders WHERE CustomerId = @customerId);

    INSERT INTO @Summary VALUES (@count, @total);
    RETURN;
END;
```

```sql
SELECT * FROM GetOrderSummary(42);
```

## Inline vs Multi-Statement TVF

| | Inline TVF | Multi-Statement TVF |
|---|---|---|
| Body | Single `RETURN (SELECT ...)` | Multiple statements building a table variable |
| Optimizer treatment | Inlined into the calling query — optimized as one unit | Treated as a "black box" — often estimated as returning very few rows, leading to poor query plans |
| Performance | Generally good | Can be significantly worse, especially at scale |
| Logic flexibility | Limited to what a single query can express | Can include loops, conditional logic, multiple steps |

- **Prefer inline TVFs** whenever the logic can be expressed as a single query — multi-statement TVFs have a well-known reputation for causing poor query plans because the optimizer can't see "inside" them the way it can with an inline TVF.

## Cursors

```sql
DECLARE @customerId INT;

DECLARE customer_cursor CURSOR FOR
    SELECT CustomerId FROM Customers WHERE IsActive = 1;

OPEN customer_cursor;
FETCH NEXT FROM customer_cursor INTO @customerId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Row-by-row processing (e.g., calling a stored procedure per customer)
    EXEC RecalculateLoyaltyPoints @customerId;
    FETCH NEXT FROM customer_cursor INTO @customerId;
END;

CLOSE customer_cursor;
DEALLOCATE customer_cursor;
```

```archify
diagrams/sql-set-vs-cursor.html
```

## Why Cursors Are Usually Avoided

- SQL engines are optimized for **set-based** operations — processing many rows in one operation is typically far more efficient than looping row-by-row, since each `FETCH` has its own overhead.
- Cursors hold locks/resources open for the duration of the loop, potentially blocking other queries longer than a single set-based statement would.

## How Cursors Can Often Be Avoided

```sql
-- Instead of a cursor calling a per-row stored procedure, express the same logic as one set-based UPDATE
UPDATE c
SET c.LoyaltyPoints = c.LoyaltyPoints + (o.TotalSpent * 0.01)
FROM Customers c
JOIN (SELECT CustomerId, SUM(Total) AS TotalSpent FROM Orders GROUP BY CustomerId) o
    ON c.CustomerId = o.CustomerId;
```

- Most row-by-row cursor logic can be rewritten as a single `UPDATE`/`INSERT` joined against an aggregated subquery — worth attempting before reaching for a cursor.
- Legitimate cursor use cases remain: calling an external stored procedure per row that itself can't be expressed set-based, or administrative scripts iterating over database objects (not application data).

## Summary

Inline TVFs act as parameterized, composable views and are generally the preferred choice when the logic fits a single query — the optimizer treats them as part of the overall query. Multi-statement TVFs allow more complex logic but are opaque to the optimizer and often perform worse at scale. Cursors process rows one at a time and are usually a last resort — most cursor-based logic can be rewritten as a faster, set-based query joined against an aggregated subquery.
