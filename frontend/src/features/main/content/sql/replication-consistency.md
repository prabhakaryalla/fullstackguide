# Replication Lag and Consistency

The primary database accepts writes, and replica databases copy those changes. Replicas can handle more reads, but asynchronous copying means a replica may briefly show old data.

```sql
-- Route a read requiring the latest write to the primary.
INSERT INTO orders (customer_id, total_amount) VALUES (42, 100);
SELECT * FROM orders WHERE customer_id = 42;
```

Send important reads to the primary, or use a method that confirms the replica has received the write. Measure replication delay and define how old data is allowed to be instead of assuming replicas are current.

## Tricky Interview Questions

**Q: Can a read replica immediately show a newly committed write?**

**A:** Not always. With asynchronous replication, the replica may be behind. Route read-after-write requests to the primary when freshness matters.