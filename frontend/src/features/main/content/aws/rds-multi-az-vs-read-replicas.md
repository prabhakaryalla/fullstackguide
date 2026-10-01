# RDS Multi-AZ vs Read Replicas

Both improve an RDS database beyond a single instance, but they solve different problems: Multi-AZ is for **availability** (surviving a failure), while Read Replicas are for **scaling read throughput** — confusing the two is a common and costly mistake.

## Short Answer

**Multi-AZ** maintains a synchronously replicated standby copy of your database in a different Availability Zone, purely for automatic failover if the primary fails — the standby is not used to serve read traffic. **Read Replicas** are separate, independently readable copies (usually asynchronously replicated, potentially in different regions) specifically meant to offload read traffic from the primary, scaling read capacity horizontally.

## Multi-AZ: High Availability

```
Primary (AZ-a)  ──synchronous replication──►  Standby (AZ-b)

If Primary fails:
  → AWS automatically fails over to the Standby
  → DNS endpoint updates to point at the new primary
  → Application reconnects with the SAME connection string (no code change needed)
```

- Replication to the standby is **synchronous** — a write isn't acknowledged to the client until it's also durably written to the standby, guaranteeing zero data loss on failover, at the cost of slightly higher write latency than a single-instance setup.
- The standby is **not accessible for reads** under normal operation — it exists purely as a hot failover target, sitting idle until needed.
- Failover is automatic and typically takes 60–120 seconds — your application needs to handle a brief connection interruption during that window (retry logic, connection pooling that reconnects gracefully).

## Read Replicas: Scaling Reads

```
Primary (read/write)  ──asynchronous replication──►  Read Replica 1 (read-only)
                       ──asynchronous replication──►  Read Replica 2 (read-only, different region)

Application:
  Writes  → always go to the Primary
  Reads   → can be spread across Read Replicas to offload the Primary
```

- Replication is **asynchronous** — replicas can lag behind the primary by a small amount (usually milliseconds to seconds, but can grow under heavy write load), so replicas are **eventually consistent**, not perfectly in sync with the primary at all times.
- Applications must be explicitly written to route read queries to replicas and writes to the primary — RDS doesn't do this automatically; it requires application-level (or a proxy layer's) awareness of which endpoint to use for which query type.
- Read Replicas can be **promoted** to become a standalone primary (useful for disaster recovery or region migration), but that's a manual, deliberate operation — not an automatic failover.
- Can be created **cross-region**, useful for serving read traffic closer to geographically distant users, or as a disaster-recovery target in a different region entirely.

## Key Differences at a Glance

| | Multi-AZ | Read Replicas |
|---|---|---|
| Purpose | High availability / failover | Read scalability |
| Replication | Synchronous | Asynchronous (eventually consistent) |
| Standby/replica readable? | No (standby only) | Yes (read-only) |
| Failover | Automatic | Manual promotion only |
| Can span regions | No (same region, different AZ) | Yes |

## Using Both Together

```
Primary (Multi-AZ: Primary + Standby in another AZ)
   │
   └── Read Replica 1 (read-only, same region)
   └── Read Replica 2 (read-only, different region, DR target)
```

These aren't mutually exclusive — a production database commonly uses Multi-AZ for automatic failover *and* one or more Read Replicas to offload read-heavy workloads (reporting queries, read-heavy API endpoints), each solving a distinct problem simultaneously.

## Common Mistake

Assuming Multi-AZ improves read performance (it doesn't — the standby is idle) or assuming a Read Replica gives you automatic failover protection (it doesn't — promoting a replica is a manual step, and asynchronous replication means some data loss is possible if you promote a lagging replica during an outage).

## Summary

Multi-AZ is about surviving failure with zero data loss via synchronous replication to an idle standby — it does not help with read scaling. Read Replicas are about scaling read throughput via asynchronous, eventually-consistent copies that your application must explicitly route reads to — they do not provide automatic failover. Production systems commonly use both together for different reasons.
