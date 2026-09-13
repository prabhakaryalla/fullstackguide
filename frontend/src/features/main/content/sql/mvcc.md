# Multi-Version Concurrency Control

MVCC keeps more than one version of a row. A reader can see a consistent copy while another transaction is writing. This reduces blocking, but old versions must be cleaned up. Long transactions can stop that cleanup.

### SQL Server

SQL Server uses MVCC-style behavior only under snapshot isolation, which must be enabled first.

```sql
ALTER DATABASE Sales SET ALLOW_SNAPSHOT_ISOLATION ON;

SET TRANSACTION ISOLATION LEVEL SNAPSHOT;
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE account_id = 1;
-- The same transaction sees a stable version of the row.
COMMIT TRANSACTION;
```

### PostgreSQL

PostgreSQL uses MVCC by default for every transaction.

```sql
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE account_id = 1;
-- The same transaction sees a stable version of the row.
COMMIT;
```

MVCC does not remove every conflict. Two updates can still need locks or cause a serialization error. Monitor long-running transactions, old-version storage, and cleanup health.

## Tricky Interview Questions

**Q: Does MVCC mean writers never block each other?**

**A:** No. Readers and writers often interfere less, but two writers can still compete for the same row.