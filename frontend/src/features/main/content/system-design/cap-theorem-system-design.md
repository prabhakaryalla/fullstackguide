# CAP Theorem

CAP theorem describes a fundamental trade-off every distributed data system must make when a network failure happens — it doesn't say a system must always sacrifice one of the three properties, only that during an actual network partition, a choice between two of them becomes unavoidable.

## The Three Properties

- **Consistency (C)** — every read receives the most recent write, or an error. All nodes see the same data at the same time.
- **Availability (A)** — every request receives a (non-error) response, without guaranteeing it contains the most recent write.
- **Partition Tolerance (P)** — the system continues operating despite network failures that prevent some nodes from communicating with others.

## The Actual Theorem: Pick 2, But Only During a Partition

```
CAP theorem's real claim: when a network partition (P) actually happens,
you must choose between Consistency (C) and Availability (A) - you cannot have both.
```

- Network partitions are a fact of life in any real distributed system spanning multiple machines/racks/datacenters — so **P is not really optional** in practice. The genuine, unavoidable choice CAP theorem describes is between **C and A specifically during a partition event**.
- When nodes can't communicate with each other (a partition), each side has two choices: keep serving requests using potentially stale/conflicting local data (choosing **A**vailability), or refuse to serve requests it can't guarantee are fully up to date (choosing **C**onsistency).
- **Outside of an actual partition** (the normal, healthy-network case), a well-designed system can absolutely provide both good consistency and good availability simultaneously — CAP's trade-off is specifically about what happens *during* a partition, not a permanent, everyday sacrifice.

## CP Systems: Choosing Consistency Over Availability

```
Example: a traditional relational database cluster with synchronous replication,
or a system like HBase/MongoDB configured for strong consistency.

During a partition: nodes that can't confirm they have the latest data
REFUSE to serve reads/writes, returning an error instead of stale data.
```

- Appropriate when serving stale or conflicting data would be actively harmful — financial transactions, inventory counts that must never oversell, configuration data that must be consistent across every consumer.

## AP Systems: Choosing Availability Over Consistency

```
Example: DynamoDB, Cassandra, or a distributed cache configured for eventual consistency.

During a partition: every node keeps serving requests using whatever local data it has,
even if it might be stale or conflict with another node's version - reconciled LATER.
```

- Appropriate when staying available (even with slightly stale data) matters more than perfect consistency — a shopping cart, a social media "like" count, a product catalog where a few seconds of staleness is a non-issue compared to the site simply going down.
- Systems choosing AP typically need an explicit strategy for **reconciling conflicting writes** once the partition heals (last-write-wins, vector clocks, application-level conflict resolution) — the trade-off doesn't just disappear once connectivity is restored.

## Common Mistake

Treating CAP as "pick any 2 of the 3, permanently, as a fixed system-wide setting" — the actual, more nuanced reality is that partition tolerance is essentially mandatory for any real distributed system, and the genuine, ongoing design decision is how the system behaves specifically **during** a partition: does it favor consistency (rejecting requests it can't verify are current) or availability (serving potentially stale data and reconciling later)? Many real systems also let this be tuned **per-operation** (e.g. DynamoDB lets you choose strongly-consistent or eventually-consistent reads on a per-request basis), rather than being one fixed, global property of the whole system.

## Summary

CAP theorem's real, precise claim is that during an actual network partition, a distributed system must choose between consistency and availability — it cannot guarantee both simultaneously while partitioned. Partition tolerance itself is effectively unavoidable for any real multi-node system, which is why the meaningful, ongoing architectural decision is really "CP or AP," tuned to what each specific workload can and can't tolerate — strict consistency for financial/inventory-critical data, higher availability for data where brief staleness is an acceptable trade-off.
