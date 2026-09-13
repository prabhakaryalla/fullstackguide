# Lock Escalation

Lock escalation happens when a database changes many small row or page locks into a larger table lock. This reduces lock-management overhead but can block other sessions.

### SQL Server

```sql
ALTER TABLE orders SET (LOCK_ESCALATION = AUTO);

UPDATE orders
SET status = 'archived'
WHERE order_date < '2020-01-01';
```

SQL Server escalates row or page locks to a table lock once roughly 5,000 locks accumulate in one statement. `LOCK_ESCALATION` can target the partition instead of the whole table.

### PostgreSQL

```sql
UPDATE orders
SET status = 'archived'
WHERE order_date < DATE '2020-01-01';
```

PostgreSQL does not automatically escalate row locks to a table lock the way SQL Server does; instead, an update like this simply holds many row locks until commit. Batch large updates to reduce lock duration and bloat regardless of vendor.

Reduce the risk by changing rows in small batches, using a selective index, keeping transactions short, and scheduling heavy maintenance carefully. The exact thresholds and controls depend on the database vendor.

## Tricky / Follow-up Questions

**Q: Does an index always prevent lock escalation?**

**A:** No. An index can reduce the rows touched, but a large enough update can still escalate. Check locks and the execution plan.