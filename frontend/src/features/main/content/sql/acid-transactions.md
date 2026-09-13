# ACID Properties of Transactions

ACID describes the safety rules for transactions. **Atomicity** means all statements succeed or none do. **Consistency** means rules and constraints remain valid. **Isolation** controls what simultaneous transactions can see. **Durability** means committed data remains saved after a crash.

### SQL Server

```sql
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT TRANSACTION;
```

### PostgreSQL

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;
```

PostgreSQL's `BEGIN` is short for `START TRANSACTION`. SQL Server requires `BEGIN TRANSACTION` (or `BEGIN TRAN`); a bare `BEGIN` is not valid T-SQL for starting a transaction.

If something fails, use `ROLLBACK`. The application must commit or roll back correctly so the complete business operation is protected.

## Tricky Interview Questions

**Q: Does ACID automatically protect a business operation?**

**A:** No. The application must put every required statement in one transaction and commit only after all statements succeed.