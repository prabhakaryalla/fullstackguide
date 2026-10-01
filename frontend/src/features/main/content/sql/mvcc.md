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

## Version Cleanup and Why Long Transactions Are Dangerous

Every update under MVCC doesn't overwrite the old row in place — it writes a **new version** and marks the old one as superseded, so any transaction that started before the update can keep reading its own consistent snapshot. Those old versions become garbage once no transaction can possibly need them anymore, and a background process (PostgreSQL's `VACUUM`, or an equivalent cleanup mechanism in other MVCC databases) reclaims that space.

**The danger of a long-running transaction:** as long as *any* transaction is still open with an old snapshot, the database cannot safely clean up row versions newer than that snapshot — even if millions of newer versions have piled up. A single forgotten long-running transaction (e.g. a developer's session left open, or a batch job that runs for hours) can prevent cleanup entirely, causing **table/index bloat**: the table's on-disk size balloons with dead row versions, queries get slower (scanning through dead versions to find live ones), and in extreme cases (PostgreSQL's transaction ID wraparound) can force emergency maintenance. This is why monitoring "oldest open transaction age" and vacuum/cleanup lag are standard production health metrics for MVCC databases, not just a theoretical concern.

## Tricky Interview Questions

**Q: Does MVCC mean writers never block each other?**

**A:** No. Readers and writers often interfere less, but two writers can still compete for the same row.