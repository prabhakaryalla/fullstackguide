# MongoDB Fundamentals: Document Model and Indexing

MongoDB is the best-known general-purpose document database — data is stored as flexible, JSON-like documents inside collections, and understanding its indexing model is what separates "it works" from "it works fast at scale."

## 1) The Document Model

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Alice",
  "email": "alice@example.com",
  "orders": [
    { "orderId": 101, "total": 49.99 },
    { "orderId": 102, "total": 19.99 }
  ]
}
```

- A **document** (like the one above) is stored in BSON (a binary form of JSON), grouped into a **collection** (roughly analogous to a SQL table, but with no fixed schema).
- Related data (like a user's orders) is often **embedded directly inside the parent document** rather than split into a separate table joined at query time — this is the core design shift from relational modeling: you model around how data is *read together*, not how it's normalized.
- Every document has a unique `_id` field (auto-generated if not supplied), which is automatically indexed.

## 2) Embedding vs Referencing

```json
// Embedded (denormalized) - one document read gets everything
{ "name": "Alice", "orders": [{ "orderId": 101, "total": 49.99 }] }

// Referenced (normalized) - requires a second query/lookup
{ "name": "Alice", "orderIds": [101, 102] }
```

- **Embed** when the related data is almost always read together with the parent, and doesn't grow unboundedly (e.g. an address embedded in a user document).
- **Reference** when the related data is large, grows unboundedly, or needs to be queried/updated independently of the parent (e.g. a user's orders, if a user can have thousands of them).
- This decision is the single most important MongoDB schema design choice — get it wrong and you either bloat every document with rarely-needed data, or pay for extra round-trip queries on every read.

## 3) Indexing

```javascript
db.users.createIndex({ email: 1 })          // single-field index, ascending
db.orders.createIndex({ customerId: 1, orderDate: -1 })  // compound index
```

- Without an index on a queried field, MongoDB performs a **collection scan** — checking every single document, which gets slower as the collection grows, exactly like a full table scan in SQL.
- A **compound index** (multiple fields) is ordered — a query that filters on the first field(s) of the index (or all of them) can use it efficiently; a query that only filters on a later field in the compound index, skipping the earlier ones, generally can't use it efficiently at all.
- `explain()` shows whether a query actually used an index (`IXSCAN`) or fell back to a full scan (`COLLSCAN`) — the same debugging habit as checking a SQL execution plan.

## 4) Common Mistake

Treating a document database exactly like a relational database — normalizing every relationship into separate collections and joining them at query time (`$lookup`) as the default approach. This throws away the document model's main advantage (reading a whole related structure in one query) and often performs worse than the equivalent well-modeled relational schema would have, since MongoDB's cross-collection joins are generally less optimized than a mature SQL engine's.

## Summary

MongoDB stores flexible, JSON-like documents in collections with no fixed schema, and the central design decision is whether to embed related data directly (denormalized, fast single-document reads) or reference it separately (normalized, more flexible but requires extra queries). Indexes work conceptually like SQL indexes — without one, a query falls back to scanning every document, and compound indexes only help when a query's filters align with the index's field order.
