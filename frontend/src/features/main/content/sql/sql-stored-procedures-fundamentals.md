# SQL Server Stored Procedures: Fundamentals, Output Parameters, and Deferred Name Resolution

Stored procedures are precompiled, named blocks of SQL — understanding their lifecycle (creation, parameters, return values, temporary variants) is foundational SQL Server knowledge that comes up constantly in interviews.

## Short Answer

A stored procedure is a saved, precompiled set of SQL statements callable by name — avoiding repeated parsing/compilation costs and centralizing reusable logic on the server. Parameters can be regular (input), output (returning a value back to the caller), or the procedure can return an integer status code — each serves a different purpose.

## Creating, Altering, and Dropping

```sql
CREATE PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT * FROM Employee;
END;
```

```sql
ALTER PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT TOP 10 * FROM Employee;
END;
```

```sql
DROP PROCEDURE GetAllEmployees;
```

```sql
EXEC GetAllEmployees;      -- or
EXECUTE GetAllEmployees;   -- or, in SSMS, just type the name and press F5
```

```sql
SP_HELPTEXT GetAllEmployees; -- retrieves the stored procedure's SQL text
```

## Why Stored Procedures Improve Performance

- Every ad-hoc SQL statement sent from an application is parsed and compiled by the server before execution — a time cost paid on **every** execution.
- A stored procedure is precompiled once; subsequent calls reuse the cached execution plan, skipping the parse/compile overhead.
- Additional benefits: centralizes reusable logic on the server (any application can call it by name), reduces network traffic (one call vs. a full query text every time), and can help prevent SQL injection (parameterized inputs rather than string-concatenated queries).

## Parameterized Stored Procedures

```sql
CREATE PROCEDURE GetEmployeesByDepartmentAndGender
    @departmentId INT,
    @gender VARCHAR(10)
AS
BEGIN
    SELECT * FROM Employee WHERE DepartmentID = @departmentId AND Gender = @gender;
END;
```

```sql
EXEC GetEmployeesByDepartmentAndGender @gender = 'Female', @departmentId = 10; -- named params, order doesn't matter
```

## Output Parameters

```sql
CREATE PROCEDURE GetGenderWiseCount
    @gender VARCHAR(10),
    @empCount INT OUTPUT
AS
BEGIN
    SELECT @empCount = COUNT(EmpId) FROM Employee WHERE Gender = @gender;
END;
```

```sql
DECLARE @empCount INT;
EXEC GetGenderWiseCount 'Female', @empCount OUTPUT;
PRINT @empCount;
```

- A stored procedure can have **multiple** output parameters, each returning a separate value of any data type back to the caller.

## Return Value (Status Code) vs Output Parameters

```sql
CREATE PROCEDURE GetTotalEmployeeCount
AS
BEGIN
    RETURN (SELECT COUNT(Id) FROM Employee);
END;
```

```sql
DECLARE @total INT;
EXECUTE @total = GetTotalEmployeeCount;
PRINT @total;
```

| | Return Value | Output Parameters |
|---|---|---|
| Data type | Integer only | Any data type |
| Count | Exactly one value | Multiple values supported |
| Typical purpose | Success/failure status code (0 = success by convention) | Returning actual business data (names, counts, computed values) |

- Attempting to `RETURN` a non-integer value (e.g., a name via `SELECT Name FROM Employee`) causes a conversion error, since the return channel is strictly typed as an integer — this is exactly why output parameters, not return values, are used for returning actual data.

## Temporary Stored Procedures

| Type | Prefix | Scope |
|---|---|---|
| **Private/Local** | `#` | Only the connection that created it; deleted automatically when that connection closes |
| **Public/Global** | `##` | Accessible by any connection, until the creating connection closes (in-progress executions from other connections are allowed to finish) |

```sql
CREATE PROCEDURE #LocalProc AS BEGIN PRINT 'Local' END;
CREATE PROCEDURE ##GlobalProc AS BEGIN PRINT 'Global' END;
```

- Useful primarily for older SQL Server versions without execution-plan reuse for ad-hoc batches — largely a legacy pattern, but still a common interview topic.

## Deferred Name Resolution

```sql
CREATE PROCEDURE spGetCustomers
AS
BEGIN
    SELECT * FROM Customers; -- Customers table doesn't exist yet!
END;
-- Creates successfully — no error, since only syntax is checked at creation time
```

```sql
EXEC spGetCustomers; -- Runtime error: Invalid object name 'Customers'
```

- SQL Server only validates **syntax** when a stored procedure is created — it does **not** check whether referenced tables/columns actually exist until the procedure is executed. This postponement is called **deferred name resolution**.
- **Functions do not support deferred name resolution** — attempting to create an inline table-valued function referencing a non-existent table fails immediately, at creation time. This is one of the clearest practical differences between stored procedures and functions in SQL Server.

## Recursive Stored Procedures

- Transact-SQL supports recursion — a stored procedure can call itself.
- Nesting (including recursive calls) is limited to **32 levels**.

## Summary

Stored procedures trade the flexibility of ad-hoc SQL for precompiled, reusable, network-efficient execution. Output parameters return actual data (any type, multiple values); return values are integer-only status codes by convention. Temporary procedures (`#`/`##` prefixes) scope visibility to one or many connections respectively. Deferred name resolution means stored procedures are only syntax-checked at creation time — object existence is verified at execution time — a behavior functions explicitly do not share.
