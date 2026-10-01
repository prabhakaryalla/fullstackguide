# Consistent Hashing

Consistent hashing is the technique that lets a distributed cache, database, or load balancer add or remove nodes without remapping (almost) all of the existing keys — a foundational building block quietly underneath most large-scale distributed systems.

## Why Plain Hashing (Modulo) Breaks Down

```
Naive approach: server = hash(key) % number_of_servers

With 4 servers:  hash(key) % 4
Add a 5th server: hash(key) % 5   ← almost EVERY key now maps to a different server!
```

- With simple modulo-based hashing, adding or removing even a single server changes the divisor, which changes the result of `% N` for nearly every key — in practice, this means almost the entire dataset needs to be moved/re-cached the moment the cluster size changes.
- For a distributed cache, this causes a massive, sudden wave of cache misses (a "thundering herd" hitting the origin database) right when the cluster is scaling — precisely when you can least afford it.

## The Idea Behind Consistent Hashing

```
1. Hash both servers AND keys onto the same circular hash space (a "ring"), typically 0 to 2^32 - 1
2. Each key is assigned to the FIRST server encountered walking clockwise around the ring from that key's position
3. Adding/removing a server only affects the keys between it and its immediate neighbor on the ring -
   NOT the entire keyspace
```

- Both servers and keys are hashed into the same numeric range and conceptually placed on a circle (the "ring").
- A key belongs to whichever server's position is the next one clockwise from the key's own position on the ring.
- When a server is added, it only "takes over" the portion of the ring between itself and the previous server occupying that region — every other key, everywhere else on the ring, stays assigned to exactly the same server it was before. Removing a server has the same limited, localized effect on just its neighboring region.

## Virtual Nodes: Solving Uneven Distribution

```
Without virtual nodes: each physical server = 1 point on the ring
  → uneven ring placement can give one server a much larger "arc" (more keys) than another

With virtual nodes: each physical server = MANY points on the ring (e.g. 100-200 per server)
  → averages out to a much more even key distribution across servers
```

- With only one point per physical server on the ring, random hash placement can easily give one server a disproportionately large share of the ring (and therefore the keys) purely by chance.
- **Virtual nodes** place each physical server at many different points around the ring (typically 100+ per server) — since load is now averaged across many smaller arcs per server instead of one large arc, the overall distribution becomes much more even, and virtual nodes also mean a newly added server picks up a proportional, evenly-spread slice of load from *many* existing servers at once, rather than taking its entire share from just one neighbor.

## Where This Actually Shows Up

- **Distributed caches** (Memcached client libraries, Redis Cluster) — deciding which cache node holds a given key, and minimizing cache invalidation when nodes are added/removed.
- **DynamoDB and Cassandra** — both use consistent hashing internally as the core mechanism for distributing data across nodes and handling cluster resizing.
- **Load balancers doing session affinity** — routing a given client consistently to the same backend server, in a way that's resilient to backend servers being added or removed from the pool.

## Common Mistake

Assuming any distributed key-to-node mapping automatically has this "minimal disruption on resize" property — plain `hash(key) % N` is a genuinely common naive first implementation that looks correct in testing (with a fixed number of nodes) and only reveals its resize problem once a cluster actually changes size in a real deployment.

## Summary

Consistent hashing places both servers and keys on a shared, circular hash space so that adding or removing a server only remaps the small portion of keys near that server's position on the ring — instead of nearly the entire keyspace, as plain modulo hashing would. Virtual nodes (many ring positions per physical server) further smooth out load distribution and make resizing events spread their impact evenly across the remaining servers rather than dumping it all on one neighbor.
