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

## Tricky Interview Questions

**Q: Does Repeatable Read always prevent phantom rows?**

**A:** Not in every database. Use Serializable or explicit locking when the business rule requires that no new matching rows appear.