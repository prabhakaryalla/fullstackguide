# Change Data Capture and Change Tracking

Change Data Capture records data changes so another system can process inserts, updates, and deletes. Change Tracking usually records that a row changed, not the full old and new values.

### SQL Server

```sql
EXEC sys.sp_cdc_enable_table
  @source_schema = 'dbo', @source_name = 'orders', @role_name = NULL;

SELECT *
FROM cdc.fn_cdc_get_all_changes_dbo_orders(
  sys.fn_cdc_get_min_lsn('dbo_orders'),
  sys.fn_cdc_get_max_lsn(),
  'all'
);
```

### PostgreSQL

PostgreSQL exposes changes through logical replication rather than a CDC table.

```sql
CREATE PUBLICATION order_changes FOR TABLE orders;
```

A consumer connects with a logical replication slot (for example, via `pg_recvlogical` or a tool like Debezium) to stream inserts, updates, and deletes from this publication.

Consumers should store a checkpoint, process changes in order where required, and make processing idempotent. Retention and cleanup must account for slow consumers.

## Tricky / Follow-up Questions

**Q: What happens if a consumer fails after processing but before saving its checkpoint?**

**A:** It may receive the same change again. Design the consumer to safely repeat work using an event ID or business key.