# Temporal Tables and Historical Queries

A temporal table keeps the history of row versions automatically. It lets you ask what the data looked like at an earlier time.

### SQL Server

```sql
CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  salary DECIMAL(10, 2),
  sys_start DATETIME2 GENERATED ALWAYS AS ROW START,
  sys_end DATETIME2 GENERATED ALWAYS AS ROW END,
  PERIOD FOR SYSTEM_TIME (sys_start, sys_end)
) WITH (SYSTEM_VERSIONING = ON);

SELECT *
FROM employees
FOR SYSTEM_TIME AS OF '2025-01-01T00:00:00';
```

SQL Server maintains a linked history table automatically once `SYSTEM_VERSIONING` is on.

### PostgreSQL

PostgreSQL has no built-in system-versioned table; history is commonly kept with a trigger and a history table.

```sql
CREATE TABLE employees_history (LIKE employees, valid_from TIMESTAMPTZ, valid_to TIMESTAMPTZ);

CREATE OR REPLACE FUNCTION employees_audit() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO employees_history
  SELECT OLD.*, OLD.updated_at, now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER employees_audit_trigger
BEFORE UPDATE ON employees
FOR EACH ROW EXECUTE FUNCTION employees_audit();
```

Temporal data is useful for audits and debugging, but history storage grows. Define retention, indexing, and access rules before enabling it.

## Tricky / Follow-up Questions

**Q: Does temporal history prove who changed a row?**

**A:** Not necessarily. It can show values and times, but you need a user or service identity column and trusted auditing to identify the actor.