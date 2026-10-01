# What Is the 5-Tuple Hashing Algorithm Used by Azure Load Balancer?

Azure Load Balancer uses a hash-based distribution method to map each new flow to a backend instance.

This behavior is often called 5-tuple hashing.

## The Five Elements in the Hash

Azure Load Balancer considers these five values from each flow:

1. Source IP address
2. Source port
3. Destination IP address
4. Destination port
5. Protocol (TCP or UDP)

These values together form the flow identity used for backend selection.

## How It Works

At a high level:

1. A new packet flow arrives at the load balancer.
2. Azure computes a hash using the 5-tuple values.
3. The hash result maps to one backend instance in the pool.
4. Packets of the same flow continue to the same backend.

This gives deterministic distribution for each unique flow.

## Why This Matters

5-tuple hashing influences:

- traffic spread across backend pool
- connection stickiness at flow level
- behavior during client retries or reconnects

If any tuple value changes (for example source port), a new hash may select a different backend.

## Architecture View

```archify
diagrams/azure-lb-5-tuple-hash.html
```

## Example

Suppose request A has:

- source IP: 10.1.1.5
- source port: 50321
- destination IP: 20.30.40.50
- destination port: 443
- protocol: TCP

That exact combination hashes to one backend.

If the same client opens another connection with a different source port, that new flow can hash to a different backend.

## Relation to Session Persistence

Azure Load Balancer's *default* distribution mode is 5-tuple hashing, but it also exposes a configurable **session persistence** (affinity) setting that deliberately narrows the hash input:

| Mode | Hash inputs used | Effect |
|---|---|---|
| **None** (default) | Source IP, source port, destination IP, destination port, protocol (5-tuple) | Finest-grained distribution; each new TCP/UDP flow can land on a different backend, even from the same client |
| **Client IP** (2-tuple) | Source IP, destination IP | All flows from the same client IP stick to the same backend — needed when a backend holds in-memory per-client state (e.g. an in-process session cache) |
| **Client IP and protocol** (3-tuple) | Source IP, destination IP, protocol | Same as above, but TCP and UDP traffic from the same client can still be pinned independently |

The tradeoff is direct: narrowing the hash input from 5-tuple to 2-tuple/3-tuple **trades distribution quality for stickiness**. A client behind a corporate NAT/proxy shares one source IP with potentially thousands of other users — under 2-tuple affinity, *all* of that traffic hashes to a single backend regardless of how many source ports are in play, creating a hotspot that 5-tuple hashing would have naturally spread out.

## Worked Example: Hash Skew in Practice

Suppose a 4-backend pool serves two very different traffic shapes at the same time:

- **10,000 short-lived API clients**, each opening one connection and closing it (varying source ports every time) → 5-tuple hashing spreads these evenly across all 4 backends, because the source port — one of the five hashed values — changes on almost every new flow.
- **3 enterprise clients behind NAT gateways**, each pushing sustained, long-lived bulk-upload connections from a small, fixed pool of source ports → because both source IP *and* source port stay fixed for the duration of each upload, all 3 uploads hash to whichever backends their specific 5-tuples land on — potentially all 3 landing on the *same* backend by chance, since there are only 3 flows to distribute across 4 backends.

The lesson: 5-tuple hashing guarantees deterministic, *per-flow* distribution — it does **not** guarantee balanced load when the number of concurrent flows is small or when flow duration varies widely. It statistically balances well only when there are many flows and reasonable diversity in source ports/IPs.

## When 5-Tuple Hashing Becomes a Bottleneck

- **Few, long-lived, heavy connections** (bulk data transfer, persistent WebSocket/gRPC streams): a small number of flows means the "law of large numbers" that makes hashing look balanced doesn't apply — a handful of unlucky hash collisions can concentrate significant sustained load on one backend for the connection's entire lifetime.
- **NAT/corporate proxy clients**: many real users collapse into very few distinct source IPs, reducing hash diversity exactly where you need it most (high user concurrency).
- **Session-affinity requirements forcing 2-tuple/3-tuple mode**: as shown above, this intentionally sacrifices distribution quality for stickiness — acceptable only if backend instance count is large enough, or if you move session state out of the backend (e.g. into Redis) so affinity isn't needed at all.
- **Mitigation**: prefer externalizing session state (distributed cache) so you can run with no affinity (full 5-tuple, best distribution); for long-lived heavy flows, consider Layer 7 (Application Gateway) with more granular routing, or explicitly spread heavy clients across more backend instances than the naive hash count would suggest.

## What Happens to Existing Sessions When Backend Pool Membership Changes?

When backend pool membership changes (for example scale-out or scale-in), behavior differs for existing flows versus new flows.

### Existing Established Flows

- Existing connections generally continue to the backend they were already mapped to, as long as that backend remains healthy and present.
- Azure Load Balancer does not typically rehash and migrate active flow state mid-connection.

### New Flows After Membership Change

- New connections are hashed against the updated backend pool.
- Because the pool set changed, new 5-tuple hashes may map to different instances than before.

### During Scale-Out

- Newly added backend instances start receiving a share of new flows.
- Existing sessions on old instances usually stay where they are.
- Traffic balancing improves over time as new sessions are created.

### During Scale-In or Backend Removal

- Flows on removed/unhealthy instances can break and must reconnect.
- Reconnected sessions are rehashed to currently available healthy backends.
- Client retry logic and connection draining strategy become important.

## Practical Impact

- Long-lived sessions may keep load skew longer after scaling changes.
- Short-lived stateless requests rebalance faster naturally.
- Graceful scale-in patterns reduce user-visible disconnects.

For production systems, combine health probes, safe drain windows, and robust client retries to minimize disruption during backend pool updates.

## Impact on Scalability and Performance

Benefits:

- efficient stateless distribution for many concurrent flows
- predictable flow-to-backend mapping
- good horizontal scaling behavior for network workloads

Considerations:

- uneven traffic can still happen if client flow patterns are skewed
- long-lived heavy flows can create hotspot backends

## Real-World Scenario

For a high-traffic API with many short-lived client connections:

- 5-tuple hashing usually produces a good spread because source ports vary frequently.

For systems with fewer, long-lived connections:

- some backends may carry heavier load depending on connection distribution.

## Summary

Azure Load Balancer 5-tuple hashing uses source IP, source port, destination IP, destination port, and protocol to assign each flow to a backend instance. This design provides deterministic and scalable traffic distribution for most network workloads.
