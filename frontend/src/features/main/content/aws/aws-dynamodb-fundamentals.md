# Amazon DynamoDB Fundamentals

DynamoDB is AWS's fully managed, serverless NoSQL database — commonly used as a key-value store (though it also supports document-style data), built for predictable low-latency access at virtually any scale.

## Short Answer

DynamoDB stores data as **items** (rows) identified by a **partition key** (and optionally a **sort key**), automatically distributing data across partitions for horizontal scalability. Throughput is provisioned (fixed RCU/WCU) or on-demand (auto-scaled by AWS), and secondary indexes (GSI/LSI) enable querying by attributes other than the primary key.

## Key Characteristics

- **Fully managed** — AWS provisions and maintains the underlying infrastructure; you never manage servers.
- **Serverless** — no server administration at all; you interact purely through the API.
- **Highly available** — data is replicated across 3 Availability Zones automatically, with support for both eventual and strongly consistent reads.
- **Scalable** — designed to scale virtually infinitely by adding partitions transparently.
- Common use cases: gaming leaderboards, e-commerce shopping cart data, user profile data, ride-sharing GPS location data — all workloads needing consistent low-latency key-value access at scale.

## Core Terminology

| Term | Meaning |
|---|---|
| **Item** | A single record/row in a table |
| **Attribute** | A field/column describing an item |
| **Primary Key** | Uniquely identifies an item — either just a partition key, or a partition key + sort key |
| **Partition Key** | Determines which physical partition stores the item (e.g., `CarId`) |
| **Sort Key** | Orders/filters items within a partition (e.g., `CustomerId`) |

- A **composite primary key** = Partition Key + Sort Key together — multiple items can share the same partition key as long as their sort key differs.

```archify
diagrams/dynamodb-partitions.html
```

## Throughput Modes

### Provisioned Throughput

- You specify **RCU** (Read Capacity Units) and **WCU** (Write Capacity Units) upfront.
- **1 RCU** = one strongly consistent read per second for an item up to 4KB (or two eventually consistent reads of the same size).
- **1 WCU** = one write per second for an item up to 1KB; a transactional write consumes 2 WCUs.
- Can be combined with **DynamoDB Auto Scaling** — define upper/lower RCU/WCU bounds, and AWS adjusts provisioned capacity automatically within them.
- Supports **Reserved Capacity** for a discounted hourly rate on predictable, sustained workloads.

### On-Demand Capacity

- DynamoDB automatically scales RCU/WCU based on actual traffic — no capacity planning needed, "just works" for spiky or unpredictable workloads.
- Costs more per individual request than provisioned capacity, but eliminates the risk of throttling from under-provisioning.

## Consistency Models

- **Eventually Consistent Reads** (default) — may return slightly stale data (replication lag across the 3 AZs), but consume the least RCU (half of a strongly consistent read).
- **Strongly Consistent Reads** — always return the most up-to-date data, at the cost of double the RCU consumption and slightly higher latency.

## Global Secondary Index (GSI) vs Local Secondary Index (LSI)

| | GSI | LSI |
|---|---|---|
| Partition Key | Can differ from the base table's | Must match the base table's |
| Sort Key | Can be any attribute | Must be a different attribute than the base table's sort key |
| Created | Any time (added after table creation) | Only at table creation time |
| Consistency | Eventually consistent only | Supports strongly consistent reads |

- **GSI** — effectively a separate index with its own partition/sort key, enabling queries by an entirely different access pattern than the base table's primary key.
- **LSI** — keeps the same partition key as the base table but offers an alternate sort order/filter within that same partition.

## Interacting with DynamoDB

- **Control Plane** (managing tables): `ListTables`, `DescribeTable`, `CreateTable`, `UpdateTable`, `DeleteTable`.
- **Data Plane** (CRUD on items): `GetItem`, `BatchGetItem`, `Query`, `Scan`, `PutItem`, `UpdateItem`, `DeleteItem`, `BatchWriteItem`, `PartiQL`.
- **Transactions** (ACID operations across items/tables): `TransactGetItems`, `TransactWriteItems`.
- **PartiQL** — a SQL-compatible query language DynamoDB supports for querying/modifying data, though it doesn't support arbitrary joins/aggregations the way a relational database does.

## DynamoDB Limitations

- Maximum item size: **400KB** — larger objects (e.g., images, large documents) should be stored in S3, with only a reference/URL stored in DynamoDB.
- Limited built-in data type support compared to relational databases.
- No native joins or complex aggregations across items — data modeling in DynamoDB typically favors denormalization (duplicating data) to avoid needing joins at query time.

## DynamoDB vs Other Databases

| | Relational (SQL Server, MySQL, Oracle) | DynamoDB |
|---|---|---|
| Scaling | Vertical (bigger server) | Horizontal (more partitions/servers) |
| Schema | Fixed schema | Schemaless (flexible per item) |
| Querying | Rich joins, grouping, aggregation | `Query`/`Scan` on keys/indexes; PartiQL for SQL-like syntax, but limited join support |
| Portability | Runs anywhere | AWS-only |

- **MongoDB** (a common point of comparison) is a JSON document database, platform-agnostic; DynamoDB is a key-value/document hybrid, AWS-exclusive.

## Real-World Example

A ride-sharing app uses DynamoDB with `DriverId` as the partition key and `Timestamp` as the sort key to store GPS location pings — this naturally distributes writes evenly across many drivers (partitions) while keeping each driver's location history sorted chronologically within their own partition, supporting the highly write-heavy, low-latency access pattern GPS tracking demands far better than a traditional relational database would at the same scale.

## Summary

DynamoDB is a fully managed, horizontally-scalable NoSQL database keyed by a partition key (optionally plus a sort key), offering provisioned or on-demand throughput modes and eventual or strong read consistency. GSIs and LSIs extend querying beyond the primary key, while its 400KB item size limit and lack of native joins mean data modeling favors denormalization — a fundamentally different design approach from relational databases, optimized for predictable low-latency access at massive scale rather than flexible ad-hoc querying.
