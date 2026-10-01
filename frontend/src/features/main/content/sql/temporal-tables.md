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

## Querying History Efficiently

Point-in-time queries (`FOR SYSTEM_TIME AS OF ...`) need to search the history table for the version valid at that timestamp — without an index on the history table's period columns (`sys_start`/`sys_end` or `valid_from`/`valid_to`), this becomes a full scan of potentially years of history for every point-in-time lookup. Always index the period columns (and typically the primary key + period columns together) on the history table specifically, not just the current table.

## Retention and Cleanup

History tables grow **unbounded** by default — every update to a row adds a new history row, forever. Production systems need an explicit retention policy (e.g. SQL Server's built-in `HISTORY_RETENTION_PERIOD`, or a scheduled job that archives/deletes history rows older than N years) — without one, the history table eventually becomes larger than the live table and query performance on it degrades.

## Tricky / Follow-up Questions

**Q: Does temporal history prove who changed a row?**

**A:** Not necessarily. It can show values and times, but you need a user or service identity column and trusted auditing to identify the actor.

**Q: Can you query "what did this row look like last Tuesday" efficiently at scale?**

**A:** Only if the history table's period columns are properly indexed — otherwise every point-in-time query degrades into a full scan of the entire history, which grows worse the longer the table has been temporally versioned without a retention policy.