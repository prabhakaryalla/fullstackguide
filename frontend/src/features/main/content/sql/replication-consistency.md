# Replication Lag and Consistency

The primary database accepts writes, and replica databases copy those changes. Replicas can handle more reads, but asynchronous copying means a replica may briefly show old data.

```sql
-- Route a read requiring the latest write to the primary.
INSERT INTO orders (customer_id, total_amount) VALUES (42, 100);
SELECT * FROM orders WHERE customer_id = 42;
```

Send important reads to the primary, or use a method that confirms the replica has received the write. Measure replication delay and define how old data is allowed to be instead of assuming replicas are current.

## How Much Lag Is Typical?

- **Same-region async replication**: usually single-digit milliseconds to low hundreds of milliseconds under normal load.
- **Cross-region async replication**: tens to hundreds of milliseconds of pure network latency, plus any queued replication backlog — can spike to seconds if the replica falls behind (e.g. during a burst of heavy writes or a replica running an expensive query).
- **Under replica overload or a long-running transaction on the replica**: lag can grow unboundedly until the underlying cause is resolved — this is why monitoring lag as an ongoing metric matters more than a single expected number.

## Monitoring Replication Lag

- Most databases expose a direct metric: PostgreSQL's `pg_stat_replication` (`replay_lag`), MySQL's `SHOW REPLICA STATUS` (`Seconds_Behind_Source`), or a managed cloud database's built-in replication-lag CloudWatch/Azure Monitor metric.
- Alert on lag exceeding a business-defined threshold (e.g. "page on-call if lag > 30s"), not just log it — silent lag growth is how stale-read incidents happen unnoticed.

## Read-Your-Own-Writes Patterns

When a user must see their own write immediately (e.g. "I just updated my profile and the page still shows old data"), common solutions:

1. **Route the immediate follow-up read to the primary** — simplest, but increases primary load and doesn't generalize (how long do you keep routing to primary after a write?).
2. **Session/version token**: after a write, the client (or session) remembers the write's log position/version (e.g. a Postgres LSN or a monotonic version number); subsequent reads are directed to a replica only if that replica's replayed position is at or past the remembered version, otherwise fall back to the primary or wait briefly.
3. **Sticky session to the same replica the write was routed through** (weaker guarantee — doesn't help if the write went to the primary and later reads hit a different, lagging replica).

## Consistency vs. Cost Tradeoff

- **Always read from primary**: strongest freshness, but doesn't scale reads and adds load to the single write path.
- **Read from any replica, accept staleness**: best read scalability and lowest primary load, appropriate for dashboards, analytics, or content that tolerates a few seconds of staleness.
- **Read-your-own-writes only where it matters** (the pattern above), reads from replicas everywhere else: the practical middle ground most production systems use — don't pay the primary-routing cost for reads that don't need strict freshness.

## Tricky Interview Questions

**Q: Can a read replica immediately show a newly committed write?**

**A:** Not always. With asynchronous replication, the replica may be behind. Route read-after-write requests to the primary when freshness matters, or use a version/token-based approach to route only the necessary reads to the primary while everything else scales out to replicas.

**Q: If replication lag suddenly spikes, what's usually the cause and how do you diagnose it?**

**A:** Common causes: the replica is under-provisioned relative to write volume, a long-running query/transaction is blocking replay on the replica, or a network issue is slowing the replication stream. Diagnose via the database's replication-lag metric combined with checking for long-running queries/locks on the replica and network/IO saturation.
