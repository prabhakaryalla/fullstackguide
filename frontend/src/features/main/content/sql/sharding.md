# Sharding versus Partitioning

Partitioning splits data inside one database. Sharding spreads data across separate database servers. Sharding can increase storage and write capacity, but it makes routing, rebalancing, joins, and transactions harder.

```sql
-- The application routes this customer to shard 2 using hash(customer_id) % 4
SELECT * FROM orders
WHERE customer_id = 1042;

-- A report needing every customer must query all four shards and merge the results
SELECT * FROM shard_0.orders WHERE order_date >= DATE '2025-01-01'
UNION ALL
SELECT * FROM shard_1.orders WHERE order_date >= DATE '2025-01-01'
UNION ALL
SELECT * FROM shard_2.orders WHERE order_date >= DATE '2025-01-01'
UNION ALL
SELECT * FROM shard_3.orders WHERE order_date >= DATE '2025-01-01';
```

Choose a shard key that spreads data evenly and keeps common queries on one server. A bad key creates overloaded servers or forces a query to visit every shard. Sharding is a scaling choice, not a replacement for good queries and indexes.

## Tricky Interview Questions

**Q: Why is choosing a shard key difficult?**

**A:** The key must spread data evenly and support common queries. A poor key creates hotspots or expensive cross-shard queries.