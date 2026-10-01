# Transaction Isolation Levels

Isolation levels decide how much one transaction can see from another transaction. Read Uncommitted can see unfinished changes. Read Committed hides unfinished changes. Repeatable Read keeps already-read rows stable. Serializable gives the strongest protection but can cause more waiting or retries. Snapshot-style levels read an older consistent version.

### SQL Server

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
SELECT available_stock FROM products WHERE product_id = 10;
UPDATE products SET available_stock = available_stock - 1 WHERE product_id = 10;
COMMIT TRANSACTION;
```

### PostgreSQL

```sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT available_stock FROM products WHERE product_id = 10;
UPDATE products SET available_stock = available_stock - 1 WHERE product_id = 10;
COMMIT;
```

PostgreSQL can set the isolation level directly on `BEGIN TRANSACTION`. SQL Server requires a separate `SET TRANSACTION ISOLATION LEVEL` statement before `BEGIN TRANSACTION`.

Choose the least restrictive level that still protects the business rule. Handle deadlock and serialization errors because concurrent work may need a retry.

## The Anomalies, Concretely

| Anomaly | What happens | Example |
|---|---|---|
| **Dirty read** | T1 reads a row that T2 has changed but not yet committed; if T2 rolls back, T1 read data that never really existed | T1: `SELECT balance` sees T2's uncommitted `-100`; T2 then rolls back; T1 acted on a balance that was never real |
| **Non-repeatable read** | T1 reads the same row twice in one transaction and gets different values, because T2 committed a change in between | T1: `SELECT stock` returns 10; T2 commits `UPDATE stock = 8`; T1: `SELECT stock` again in the same transaction now returns 8 |
| **Phantom read** | T1 re-runs the same filtered query twice and gets a *different set of rows* the second time, because T2 inserted/deleted a matching row in between | T1: `SELECT * WHERE status='pending'` returns 5 rows; T2 inserts a new pending row and commits; T1 re-runs the same query and now gets 6 rows |

**Which level prevents which:**

- **Read Uncommitted**: prevents nothing — dirty reads, non-repeatable reads, and phantoms are all possible.
- **Read Committed**: prevents dirty reads only.
- **Repeatable Read**: prevents dirty reads and non-repeatable reads; phantom-row prevention is **database-specific** — PostgreSQL's Repeatable Read (built on MVCC snapshots) does prevent phantoms in practice, while the SQL standard's definition of Repeatable Read technically does not guarantee it, which is why "does Repeatable Read prevent phantoms?" is a classic trick question with an "it depends on the database" answer.
- **Serializable**: prevents all three, at the cost of the most blocking/retries (the database detects conflicts and forces one transaction to abort and retry).

## Tricky Interview Questions

**Q: Does Repeatable Read always prevent phantom rows?**

**A:** Not in every database. Use Serializable or explicit locking when the business rule requires that no new matching rows appear.