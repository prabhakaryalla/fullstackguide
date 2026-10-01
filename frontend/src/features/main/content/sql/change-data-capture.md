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

## Ordering and Delivery Guarantees

- **Ordering**: changes are typically delivered **in commit order per source** (e.g. per table, or per replication slot) — but if you fan out to multiple parallel consumers, you can easily lose that ordering unless you explicitly partition work by a key (e.g. by primary key or aggregate ID) so all changes for the same entity go to the same consumer/partition in order.
- **At-least-once, not exactly-once, by default**: most CDC systems guarantee a change will be delivered at least once — if a consumer crashes after processing a change but before committing its checkpoint, it will see that same change again on restart. True exactly-once delivery generally isn't provided by the transport layer itself; you build it at the consumer by making processing **idempotent** (e.g. using the change's LSN/sequence number as a natural dedup key, or an upsert instead of an insert).
- **Can a fast consumer "get ahead"?** No — a consumer can only advance as fast as it processes and checkpoints; it cannot skip ahead of unprocessed changes. It *can*, however, fall behind if it's slower than the rate of change generation, which is why monitoring consumer lag (distance between the latest change and the consumer's checkpoint) matters operationally, same as replication lag.

## When CDC Is Overkill

For simple cases — e.g. maintaining a single denormalized summary column, or triggering one straightforward downstream action — a plain database **trigger** that writes directly to an audit/outbox table can be simpler to operate than standing up a full CDC pipeline (Debezium, a replication slot, a message broker) with its own infrastructure, monitoring, and failure modes. Reach for CDC when you need to reliably stream changes to **multiple independent external consumers**, need minimal impact on the source table's write path (CDC reads the transaction log, not the table itself), or need to feed a data pipeline/search index/cache that must reflect every change without polling.

## Tricky / Follow-up Questions

**Q: What happens if a consumer fails after processing but before saving its checkpoint?**

**A:** It may receive the same change again. Design the consumer to safely repeat work using an event ID or business key.