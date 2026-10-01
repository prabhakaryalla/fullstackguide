# DynamoDB Hot Partitions Despite Sufficient Total Throughput

A DynamoDB table can have plenty of *total* provisioned (or on-demand) capacity and still throttle requests — because throughput isn't actually shared evenly across the whole table, it's divided across physical partitions based on your partition key, and a poorly chosen key concentrates load onto just one or two of them.

## The Trap

```
Table: Orders, partition key = "OrderDate" (e.g. "2026-09-29")

On a normal day, all orders share the SAME partition key value (today's date) -
every single write for the entire day lands on the SAME physical partition.

Result: even if the table has generous overall provisioned throughput,
requests start getting ThrottlingException errors - because one partition
is absorbing 100% of the traffic while every other partition sits idle.
```

**What most people expect:** as long as the table's total provisioned (or on-demand) throughput is high enough for the overall traffic volume, requests should succeed.

**What actually happens:** DynamoDB divides a table's total throughput across its physical partitions based on the partition key's distribution — if most/all writes share the same (or very few) partition key values, they all land on the same tiny subset of partitions, which can throttle even while the table's *aggregate* capacity looks more than sufficient.

## Why This Happens

- DynamoDB automatically splits a table's data (and its provisioned capacity) across multiple physical partitions as the table grows — but a table's *total* configured throughput doesn't mean any single partition can handle that entire amount; each partition has its own individual capacity ceiling.
- Which partition a given item lives on is determined entirely by hashing its **partition key** value — items with the same partition key value always land on the same partition (this is required, since all items sharing a partition key must be co-located to support efficient queries by that key).
- A partition key with low cardinality (few distinct values) or uneven access patterns (some values accessed far more often than others) concentrates both storage *and* request load onto a small number of partitions — exactly the "hot partition" problem, even when the table's overall configured capacity would easily be enough if it were spread evenly.

## The Fix: Design the Partition Key for Even Distribution

```
Bad:  partition key = "OrderDate"          - all of today's orders land on one partition
Good: partition key = "CustomerId"          - naturally spreads across many distinct values

Even better for extreme cases - a "sharded" key that adds a random/hashed suffix:
  partition key = "OrderDate#3"  (date + a random shard number 0-9)
  - spreads a single day's writes across 10 partitions instead of 1,
    at the cost of needing to query all 10 shards and merge results when reading "today's orders"
```

- The core fix is choosing a partition key with high cardinality and roughly even access frequency across its values — something like a customer ID, a user ID, or an order ID, rather than a date, a status flag, or any other field with only a handful of possible values that traffic naturally clusters around.
- When the natural, query-friendly key is inherently low-cardinality (like a date), a common technique is **write sharding** — appending a random or hashed suffix to spread a single logical key's writes across several physical partitions — accepting the added complexity of fanning reads out across those shards and merging results.

## Common Mistake

Assuming that increasing a table's overall provisioned throughput (or switching to on-demand capacity) fixes a hot-partition throttling problem. It doesn't — the problem isn't a lack of total capacity, it's that capacity isn't (and structurally can't be) evenly usable across partitions when the partition key itself concentrates traffic onto just one or two of them. The fix has to happen in the data model (the partition key choice), not in the provisioned throughput settings.

## Summary

DynamoDB spreads a table's data and throughput across physical partitions based on the partition key's hashed value — a partition key with low cardinality or uneven access patterns concentrates load onto a small number of partitions, causing throttling even when the table's aggregate configured capacity looks more than sufficient. The fix is choosing (or reshaping, via write sharding) a partition key that spreads both data volume and request traffic evenly across many distinct values, not simply raising the table's overall throughput settings.
