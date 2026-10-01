# NoSQL vs SQL: When to Choose Which

Relational (SQL) and non-relational (NoSQL) databases aren't "old vs new" — they make different trade-offs, and picking the wrong one for a workload causes real, ongoing pain.

## 1) What Actually Differs

- **Schema**: SQL requires a fixed schema (columns, types) defined upfront; NoSQL (document/key-value stores) typically lets each record have a different shape, with no upfront schema enforcement.
- **Relationships**: SQL is built around relationships — joining tables via foreign keys. Most NoSQL databases avoid joins entirely, favoring denormalized, self-contained documents instead.
- **Consistency**: SQL databases are built around strong (ACID) transactional consistency by default. Many NoSQL databases default to eventual consistency, trading strict consistency for availability and horizontal scale (see the CAP theorem).
- **Scaling**: SQL databases traditionally scale **vertically** (a bigger server) more easily than horizontally; NoSQL databases are generally designed from the ground up to scale **horizontally** (adding more, cheaper machines).

## 2) When SQL Is the Right Choice

- Data has clear, stable relationships (orders belong to customers, line items belong to orders) that you need to query flexibly and consistently.
- You need strong transactional guarantees — e.g. moving money between two accounts must either fully succeed or fully fail, with no in-between state ever visible.
- Your query patterns aren't fully known upfront — SQL's flexible `JOIN`/`WHERE`/`GROUP BY` let you ask new questions of the data later without redesigning storage.
- Example: an e-commerce order system, a banking ledger, an HR/payroll system.

## 3) When NoSQL Is the Right Choice

- Data is naturally self-contained per record, with little need for cross-record joins — a user profile, a product catalog entry, a chat message.
- You need to scale writes/reads horizontally across many machines, well beyond what a single (even large) relational server can handle.
- Your data's shape varies significantly between records, or changes frequently, and a rigid upfront schema would slow down development.
- You can tolerate eventual consistency for at least some data (e.g. a "like count" that's a few seconds stale is fine; a bank balance usually isn't).
- Example: a product catalog with wildly different attributes per category, a session store, an IoT sensor-reading pipeline, a social media feed.

## 4) Different Kinds of NoSQL (It's Not One Thing)

| Type | Example | Best For |
|---|---|---|
| Document store | MongoDB, Cosmos DB (SQL API) | Self-contained records with varying shape (JSON-like documents) |
| Key-Value store | Redis, DynamoDB | Extremely fast lookups by a single key (cache, session store) |
| Wide-column store | Cassandra, HBase | Very high write throughput at massive scale, time-series-like data |
| Graph database | Neo4j | Data that's fundamentally about relationships/connections (social graphs, recommendation engines) |

"NoSQL" isn't a single alternative to SQL — it's an umbrella term for several genuinely different data models, each suited to different access patterns.

## 5) A Common Mistake

Choosing NoSQL purely because "it scales better" without an actual scaling requirement, and then discovering you've lost the flexible ad-hoc querying, joins, and strong consistency a relational database would have given you for free. NoSQL's benefits come with real trade-offs — they aren't a strictly superior upgrade over SQL.

## Summary

SQL databases give you strong consistency, flexible querying, and well-modeled relationships, at the cost of scaling that's traditionally harder to spread horizontally. NoSQL databases trade some of that consistency/flexibility for schema flexibility and easier horizontal scale — and "NoSQL" itself splits into several different models (document, key-value, wide-column, graph), each fitting a different kind of workload. The right choice depends on your actual data shape, consistency needs, and scaling requirements — not which one is currently more fashionable.
