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

## Which One to Pick

| Choose **optimistic** when | Choose **pessimistic** when |
|---|---|
| Conflicts are rare (most rows are edited by only one user at a time) | Conflicts are frequent, or a conflict is expensive/impossible to undo (e.g. overselling the last unit of stock) |
| You want maximum concurrency/throughput — no one blocks waiting for a lock | Short, predictable critical sections where holding a lock briefly is cheaper than handling a retry |
| The client can meaningfully retry or re-prompt the user (e.g. "someone else edited this, please review and resubmit") | There's no good way to "retry" the user-facing action (e.g. a checkout flow shouldn't tell a paying customer to try again) |

**Real-world example — e-commerce checkout (pessimistic) vs. profile edit (optimistic):** reserving the last unit of inventory during checkout is a good case for pessimistic locking (`FOR UPDATE`/`UPDLOCK`) — you cannot afford to oversell, and the lock is held only briefly. Editing a user's own profile fields is a good case for optimistic concurrency — two edits to the same profile at the same instant are rare, and if it happens, simply asking the user to retry is an acceptable, low-cost outcome.

**Failure recovery for optimistic conflicts:** on a zero-row-affected result, either (a) reload the current row and show the user what changed so they can decide how to merge/retry, or (b) automatically retry the whole read-modify-write cycle a bounded number of times if the update is idempotent and doesn't need human judgment (e.g. a counter increment).