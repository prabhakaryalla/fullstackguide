# Backup and Disaster Recovery

Backups let you restore data after accidental deletion, corruption, or infrastructure failure. A full backup copies the database. Differential or incremental backups copy changes. Log backups can support point-in-time recovery in systems that provide them.

### SQL Server

```sql
-- Full backup, then a transaction log backup for point-in-time recovery
BACKUP DATABASE Sales TO DISK = 'D:\Backups\Sales_Full.bak' WITH INIT;
BACKUP LOG Sales TO DISK = 'D:\Backups\Sales_Log1.trn';

-- Restore the full backup, then apply the log to reach a later point in time
RESTORE DATABASE Sales FROM DISK = 'D:\Backups\Sales_Full.bak' WITH NORECOVERY;
RESTORE LOG Sales FROM DISK = 'D:\Backups\Sales_Log1.trn' WITH RECOVERY;
```

### PostgreSQL

```sql
-- Logical backup and restore of a single database
pg_dump --format=custom --file=sales_full.dump sales
pg_restore --dbname=sales --clean sales_full.dump
```

For point-in-time recovery, PostgreSQL relies on a base backup plus continuously archived write-ahead logs:

```sql
pg_basebackup --pgdata=/backups/base --format=tar
-- WAL archiving must be enabled via archive_mode and archive_command in postgresql.conf
```

Two numbers describe backup needs: **Recovery Point Objective (RPO)** is how much data loss is acceptable, and **Recovery Time Objective (RTO)** is how long recovery may take.

A backup is not proven until it has been restored and checked. Store copies separately from the primary system, encrypt them, limit access, define retention, and test recovery regularly.

## Tricky / Follow-up Questions

**Q: Is replication a backup?**

**A:** No. Bad deletes and corruption can replicate immediately. Replication improves availability; backups provide a recovery point.