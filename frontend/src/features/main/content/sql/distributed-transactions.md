# Distributed Transactions and Two-Phase Commit

A distributed transaction changes more than one database or service. Two-phase commit first asks every participant whether it can commit, then tells all participants to commit. It keeps the operation together but adds delay, failures, blocking, and complexity.

### SQL Server

SQL Server coordinates a distributed transaction across linked servers using the Microsoft Distributed Transaction Coordinator (MSDTC). The prepare and commit phases happen automatically; the application only opens one distributed transaction.

```sql
BEGIN DISTRIBUTED TRANSACTION;

UPDATE ServerA.Bank.dbo.Accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE ServerB.Bank.dbo.Accounts SET balance = balance + 100 WHERE account_id = 2;

COMMIT TRANSACTION;
```

MSDTC prepares both linked servers behind the scenes and only commits on both if both prepared successfully; otherwise it rolls back both.

### PostgreSQL

PostgreSQL exposes the two phases explicitly through `PREPARE TRANSACTION` and `COMMIT PREPARED`. Each node prepares independently, and a coordinator commits both only after every `PREPARE TRANSACTION` succeeds.

```sql
-- Node A: prepare the local part of the transfer
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
PREPARE TRANSACTION 'transfer_42';

-- Node B: prepare the other local part of the transfer
BEGIN;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
PREPARE TRANSACTION 'transfer_42';

-- Coordinator: only after BOTH nodes prepared successfully
COMMIT PREPARED 'transfer_42';  -- run on Node A
COMMIT PREPARED 'transfer_42';  -- run on Node B
```

If either `PREPARE TRANSACTION` fails, the coordinator runs `ROLLBACK PREPARED` on the node that succeeded instead of committing. `max_prepared_transactions` must be configured, and prepared transactions left open too long can block vacuum and hold locks.

In a service-based system, an outbox, repeatable message handling, and compensating actions are often easier to operate. Choose the approach based on how strong consistency must be and how failures will be repaired.

## Tricky Interview Questions

**Q: Is two-phase commit always the best way to keep services consistent?**

**A:** No. It gives strong coordination but can block and is hard to operate. An outbox and compensating action may be a better fit for independent services.