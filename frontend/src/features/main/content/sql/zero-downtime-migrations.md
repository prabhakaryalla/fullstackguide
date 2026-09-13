# Zero-Downtime Schema Migrations

Safe production changes are compatible with both the old and new application versions. Add a nullable column, deploy code that writes both columns, copy old data in small batches, switch reads, check the results, and remove the old column later.

### SQL Server

```sql
ALTER TABLE customers ADD normalized_email VARCHAR(320) NULL;

UPDATE TOP (10000) customers
SET normalized_email = LOWER(email)
WHERE normalized_email IS NULL;
```

### PostgreSQL

```sql
ALTER TABLE customers ADD COLUMN normalized_email VARCHAR(320);

UPDATE customers
SET normalized_email = LOWER(email)
WHERE normalized_email IS NULL
  AND customer_id BETWEEN 1 AND 10000;
```

SQL Server's `ALTER TABLE ... ADD` does not use the `COLUMN` keyword, and `UPDATE TOP (n)` batches rows directly. PostgreSQL requires `ADD COLUMN` and batches with a `WHERE` range or `LIMIT` inside a subquery.

Avoid changes that lock a large table for a long time. Do not delete old columns until old application code is gone. Make backfills restartable and watch locks, replication delay, and errors.

## Tricky Interview Questions

**Q: Why should a column be removed in a later release?**

**A:** Older application instances may still read it. Keeping it during the transition allows old and new versions to run together safely.