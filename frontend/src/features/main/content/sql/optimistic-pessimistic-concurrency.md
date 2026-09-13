# Optimistic versus Pessimistic Concurrency

Optimistic concurrency assumes two users rarely edit the same row and checks for changes when saving. Pessimistic concurrency locks the row before changing it and is useful when conflicts are common or overselling must be prevented.

```sql
-- Optimistic version check
UPDATE products
SET available_stock = available_stock - 1, row_version = row_version + 1
WHERE product_id = 10 AND row_version = 7;
```

If no row was updated, someone else changed the product. Reload the row or retry.

A pessimistic lock is taken before changing the row, but the locking hint differs by database.

### SQL Server

```sql
BEGIN TRANSACTION;
SELECT available_stock
FROM products WITH (UPDLOCK, ROWLOCK)
WHERE product_id = 10;

UPDATE products SET available_stock = available_stock - 1 WHERE product_id = 10;
COMMIT TRANSACTION;
```

### PostgreSQL

```sql
BEGIN;
SELECT available_stock
FROM products
WHERE product_id = 10
FOR UPDATE;

UPDATE products SET available_stock = available_stock - 1 WHERE product_id = 10;
COMMIT;
```

## Tricky Interview Questions

**Q: How do you know an optimistic update failed?**

**A:** Check the affected-row count. Zero rows means the version no longer matches because another user changed the row.