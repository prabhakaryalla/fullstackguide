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

## Adding a Column With a Different Value Per Row, Under Heavy Write Load

The scenario: a table has millions of existing rows, thousands of new rows arrive every second, and the new column's value isn't the same for every row (it has to be computed per row — e.g. a normalized email, a hash, a derived score) rather than one constant like `DEFAULT 0`.

This rules out the fastest trick in the book: on modern engines (SQL Server 2012+, PostgreSQL 11+), `ALTER TABLE ... ADD COLUMN x INT DEFAULT 0` is a cheap, near-instant **metadata-only** change when the default is a single constant — the engine doesn't have to touch existing rows at all. That trick only works because every existing row would get the *same* value. The moment the value has to be computed per row, something has to actually visit and rewrite every row — so the real question becomes "how do we do that rewrite without breaking the thousands of writes happening per second, or the app that's still reading."

**Step 1 — Add the column as nullable, with no default.**

```sql
ALTER TABLE events ADD COLUMN risk_score INT NULL; -- fast, metadata-only, no row rewrite
```

Being nullable and default-free keeps this step itself cheap and non-blocking, regardless of table size.

**Step 2 — Make every new row self-sufficient first (stop the bleeding).**

Deploy the application (or a trigger, if application changes aren't possible) so that every *new* insert computes and writes `risk_score` immediately. This is the most important step: it guarantees the "thousands of rows per second" firehose is no longer adding to the backlog — from this point on, only the pre-existing millions of rows are missing a value, a fixed and shrinking number.

**Step 3 — Backfill the existing rows in small, resumable batches.**

```sql
UPDATE TOP (5000) events
SET risk_score = dbo.ComputeRiskScore(payload)
WHERE risk_score IS NULL
  AND event_id > @lastProcessedId
ORDER BY event_id;
```

- Batch by a stable key range (primary key/identity), not by row count or a snapshot offset — the table is changing underneath you the whole time, so an approach like `OFFSET/FETCH` can skip or reprocess rows as new data is inserted.
- Keep a checkpoint (`@lastProcessedId`) outside the transaction so the job can stop and resume safely if it's interrupted — never assume a multi-hour backfill over millions of rows will run start-to-finish without a hiccup.
- Throttle between batches (a short delay, or watch live metrics like replication lag/lock wait time) so the backfill doesn't starve the live traffic of I/O or lock the table for extended periods. A single giant `UPDATE` over the whole table is exactly what you're avoiding here — it takes a long-held lock, bloats the transaction log/WAL, and can spike replication lag badly enough to affect read replicas.
- If computing the value is expensive (an API call, heavy parsing), do that computation outside the database entirely — read a batch of rows, compute in application code (in parallel), then write back only the computed values.

**Step 4 — Only tighten constraints once the backfill has fully caught up.**

Once a count of `WHERE risk_score IS NULL` reaches (and stays at) zero, you can add `NOT NULL` if required. Be aware that adding a `NOT NULL` constraint to an existing column can itself require validating every row again — on PostgreSQL, prefer adding a `CHECK (risk_score IS NOT NULL) NOT VALID` first (instant), then `VALIDATE CONSTRAINT` separately (which scans the table but takes a much lighter lock, and can be timed for off-peak hours).

## Tricky Interview Questions

**Q: A table has millions of rows, and thousands more are inserted every second. You need to add a column whose value is different for every row (not one shared default). What approach avoids breaking things?**

**A:** Add the column as nullable with no default (a fast, metadata-only change). Immediately update the application so every *new* row populates the value going forward — this stops the missing-value backlog from growing. Then backfill the existing rows in small batches, keyed by a stable range (not row count or offset, since the table keeps changing), with a resumable checkpoint and throttling between batches so the backfill doesn't compete with live traffic for locks/I/O. Only add a `NOT NULL` constraint once the backfill has fully caught up, and prefer a two-step validate (`NOT VALID` then `VALIDATE CONSTRAINT` on PostgreSQL) over one that re-scans and locks the whole table in a single step.

**Q: Why should a column be removed in a later release?**

**A:** Older application instances may still read it. Keeping it during the transition allows old and new versions to run together safely.