# Designing and Executing an Efficient Data Migration for Millions of Records

Migrating ~40 lakh (4 million) records isn't a single `INSERT ... SELECT` you run and hope for the best — it needs batching, progress tracking, idempotency, and a rollback plan so a failure halfway through doesn't leave data in a broken state.

## Short Answer

Break the migration into small, resumable batches; run it off-hours or throttled to avoid impacting production load; make each batch idempotent so it can safely re-run; track progress so you can resume after a failure; and validate the result before considering it complete.

## 1. Plan Before Writing Code

- **Source and target shape**: confirm schema differences, required transformations, and data type conversions upfront.
- **Downtime tolerance**: decide if this is an offline migration (maintenance window) or an online migration (system stays live during the move).
- **Volume and batch size**: 4 million rows is large enough that a single transaction will hold locks too long — always chunk it.

## 2. Batch the Migration

Process records in fixed-size chunks instead of one giant operation:

```csharp
const int batchSize = 5000;
int lastProcessedId = await _checkpointStore.GetLastProcessedIdAsync();

while (true)
{
    var batch = await _sourceDb.Records
        .Where(r => r.Id > lastProcessedId)
        .OrderBy(r => r.Id)
        .Take(batchSize)
        .ToListAsync();

    if (batch.Count == 0) break;

    await MigrateBatchAsync(batch);
    lastProcessedId = batch[^1].Id;
    await _checkpointStore.SaveLastProcessedIdAsync(lastProcessedId);
}
```

```archify
diagrams/dotnet-migration-pipeline.html
```

## 3. Make Each Batch Idempotent and Resumable

- Use `UPSERT`/`MERGE` (or "insert if not exists") instead of plain `INSERT`, so re-running a batch after a crash doesn't create duplicates.
- Persist a **checkpoint** (last processed ID/cursor) after every successful batch, so a restart resumes from where it left off instead of starting over.
- Prefer ID/keyset pagination (`WHERE Id > lastId`) over `OFFSET`, which gets slower as the offset grows on large tables.

## 4. Use Bulk Operations, Not Row-by-Row Inserts

- Use `SqlBulkCopy`, EF Core's bulk extensions, or batched `INSERT ... VALUES` with multiple rows per statement — avoid calling `SaveChanges()` per row (extremely slow at millions of rows).

```csharp
using var bulkCopy = new SqlBulkCopy(connectionString)
{
    DestinationTableName = "TargetRecords",
    BatchSize = 5000
};
await bulkCopy.WriteToServerAsync(dataTable);
```

## 5. Protect Production Systems

- Throttle the migration (delay between batches, or run during off-peak hours) to avoid saturating I/O/CPU on a live database.
- Migrate against a **read replica** of the source where possible, so the migration read load doesn't compete with production traffic.
- Disable non-essential indexes/triggers on the target table during the bulk load, then rebuild indexes afterward — much faster than maintaining them per-row.

## 6. Validate and Reconcile

- After migration, compare row counts, checksums, or sampled record comparisons between source and target.
- Run the migration in a **dry-run/staging** environment first with a production-like data volume to catch performance issues before the real run.

```archify
diagrams/dotnet-migration-loop-sequence.html
```

## 7. Have a Rollback / Recovery Plan

- Keep the source data untouched (read-only) until the target is validated — never delete source data as part of the same job.
- If a batch fails, log the failure with enough context (batch range, error) to retry just that batch instead of restarting the entire migration.

## Real-World Example

Migrating 4 million customer order records from a legacy on-prem SQL Server to a new Azure SQL database: the job runs as a scheduled background process in batches of 5,000 using keyset pagination, writes via `SqlBulkCopy`, checkpoints progress in a small tracking table after every batch, runs during a low-traffic overnight window, and finishes with a row-count and checksum comparison before the legacy system is decommissioned.

## Summary

Efficient large-scale migration comes down to: batch instead of bulk-transact everything at once, make batches idempotent and resumable via checkpoints, use true bulk-insert APIs instead of row-by-row saves, protect production load, and validate the result — turning a risky one-shot operation into a safe, restartable process.
