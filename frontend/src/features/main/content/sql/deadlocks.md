# Database Deadlocks and Prevention

A deadlock happens when two transactions wait for each other forever. The database detects the problem and cancels one transaction.

```sql
-- Transaction A: locks account 1, then account 2
UPDATE accounts SET balance = balance - 10 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 10 WHERE account_id = 2;
```

Prevent deadlocks by changing tables and rows in the same order, keeping transactions short, using useful indexes, and never waiting for user input inside a transaction. Retry the cancelled transaction when it is safe to repeat.

The example above works unchanged in both SQL Server and PostgreSQL. Detection is reported differently: **SQL Server** raises error 1205 and can log a deadlock graph via Extended Events. **PostgreSQL** raises a `deadlock_detected` error and logs the cycle when `log_lock_waits` is enabled.

## Tricky Interview Questions

**Q: Is a deadlock the same as a slow query?**

**A:** No. A slow query takes a long time; a deadlock is a circular wait between transactions, so the database must cancel one of them.