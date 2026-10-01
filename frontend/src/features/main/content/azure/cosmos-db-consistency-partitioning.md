# Cosmos DB: Consistency Levels and Partitioning

Azure Cosmos DB is a globally distributed, multi-model NoSQL database — its two most interview-relevant, distinguishing features are the five tunable consistency levels (a genuinely unusual level of choice compared to most databases) and how partitioning determines both scalability and query efficiency.

## Short Answer

Cosmos DB offers **five consistency levels** on a spectrum from Strong (always see the latest write, slower/costlier) to Eventual (may see stale data, fastest/cheapest) — letting you tune the classic consistency-vs-latency/availability trade-off per container rather than accepting a single, fixed database-wide default. **Partitioning** splits data across physical partitions based on a chosen **partition key** — a well-chosen key spreads load evenly and enables efficient, single-partition queries; a poorly-chosen key creates "hot partitions" and forces expensive cross-partition fan-out queries.

## The Five Consistency Levels

```
Strong ─────────────────────────────────────────────────► Eventual
(most consistent,                                    (least consistent,
 highest latency/cost)                                 lowest latency, highest availability)

Strong → Bounded Staleness → Session → Consistent Prefix → Eventual
```

- **Strong** — every read sees the most recent committed write, guaranteed — the highest latency and lowest availability during network partitions, since it requires synchronous confirmation across replicas.
- **Bounded Staleness** — reads may lag behind writes, but only up to a configured bound (a number of versions, or a time interval) — a middle ground with predictable staleness limits.
- **Session** (the most commonly used default) — within a single client "session," you always see your own writes and monotonically advancing reads — a very practical guarantee for typical application usage (a user always sees their own actions reflected immediately) without paying Strong's full latency cost.
- **Consistent Prefix** — reads never see out-of-order writes (if write A happened before write B, you'll never see B without also having seen A) — but there's no bound on how stale the data might be.
- **Eventual** — the weakest guarantee: reads may return any previously written value in any order, with no ordering or staleness guarantee at all — the lowest latency and highest availability, appropriate when the application can tolerate genuinely unordered, possibly-stale reads.

## Choosing a Consistency Level

```
Session consistency (the default, and the right choice for most applications):
  - A user updates their profile, then immediately reloads the page
  - Session consistency guarantees they see their OWN update immediately
  - Other users might see it slightly later, which is usually perfectly acceptable
```

Session is the practical default for most real applications — it gives "read your own writes" behavior (which users expect and notice violations of immediately) without Strong's full latency/availability cost. Strong is reserved for genuinely critical correctness requirements (e.g. financial balance checks) where even Session's cross-user staleness window is unacceptable.

## Partitioning: Choosing a Partition Key

```
Container: Orders
Partition Key: /customerId

Query: SELECT * FROM Orders WHERE customerId = 'abc123'
  → single-partition query - fast, low RU cost, routed directly to the one relevant partition

Query: SELECT * FROM Orders WHERE orderDate > '2026-01-01'
  → cross-partition query (fans out to EVERY partition) - much higher RU cost and latency
```

- Cosmos DB automatically splits data across physical partitions based on the partition key's value — a good partition key distributes both storage volume **and** request traffic evenly across the resulting partitions.
- A query that filters by the partition key becomes a fast, cheap, single-partition operation. A query that doesn't include the partition key must fan out across every physical partition, which is significantly more expensive (in Request Units, Cosmos DB's throughput currency) and slower.
- **Hot partitions** occur when a chosen key concentrates too much traffic onto one logical partition value (e.g. partitioning by `tenantId` when one tenant is vastly larger/more active than all others combined) — that single partition can be throttled while every other partition sits comparatively idle, even though the container's *overall* provisioned throughput looks sufficient in aggregate.

## Common Mistake

Choosing a partition key based purely on what feels like a natural "ID" field (like a global incrementing `orderId`) without considering actual query patterns and traffic distribution — a key that doesn't align with your most common queries forces expensive cross-partition fan-out on your hottest code paths, and a key with uneven value distribution creates hot partitions regardless of how much total throughput the container has provisioned.

## Summary

Cosmos DB's five consistency levels let you deliberately trade consistency for latency/availability per container, with Session being the practical default for most applications and Strong reserved for genuinely critical correctness needs. Partition key choice determines both how evenly load spreads across physical partitions and whether your most common queries can be efficiently routed to a single partition — getting it wrong causes either hot-partition throttling or expensive cross-partition fan-out queries, regardless of how much throughput is provisioned overall.
