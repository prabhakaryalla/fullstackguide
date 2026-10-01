# Design a Rate Limiter

A rate limiter restricts how many requests a client (user, IP, or API key) can make in a given time window, protecting backend services from overload and abuse.

In system design interviews, this question tests your knowledge of counting algorithms, distributed state management, and low-latency decision-making on the hot request path.

## 1. Problem Statement

Build a service like the one behind the Stripe or GitHub API that:

- allows a client N requests per time window (e.g., 100 requests/minute)
- rejects requests beyond the limit with HTTP 429
- works correctly across many API servers, not just one machine

## 2. Functional Requirements

- Limit requests per user/IP/API key/tenant.
- Support different limits per API endpoint or plan tier.
- Reject excess requests with a clear error and retry hint (`Retry-After` header).
- Allow limits to be configured without redeploying services.

## 3. Non-Functional Requirements

- Decision latency must be very low (a few milliseconds) — it sits in front of every request.
- Must work correctly when traffic is spread across many servers (distributed counting).
- High availability — the limiter should not become a single point of failure.
- Memory-efficient at scale (millions of active clients).

## 4. High-Level Architecture

```archify
diagrams/sd-ratelimiter-architecture.html
```

Real systems usually place the rate limiter as a lightweight check inside the API gateway, backed by a fast, shared, in-memory store like Redis so every gateway node sees the same counters.

## 5. Rate Limiting Algorithms

| Algorithm | How it works | Pros | Cons |
|---|---|---|---|
| Fixed Window Counter | Count requests per fixed time bucket (e.g., per minute) | Simple, cheap | Bursts at window edges (2x limit possible) |
| Sliding Window Log | Store timestamp of every request, count within rolling window | Very accurate | High memory per client |
| Sliding Window Counter | Weighted average of current + previous fixed window | Smooths edge bursts, cheap | Slight approximation |
| Token Bucket | Bucket refills tokens at fixed rate; request consumes a token | Allows controlled bursts, industry standard | Slightly more logic to implement |
| Leaky Bucket | Requests queue and leak out at constant rate | Smooths traffic to a steady rate | Extra latency from queuing |

Token Bucket is the most commonly used in interviews because it naturally allows short bursts while enforcing an average rate — similar to how AWS API Gateway and Stripe throttle clients.

## 6. Data Model / Storage

Using Redis as the shared counter store:

- Key: `rate_limit:{clientId}:{endpoint}`
- Value: current token count or request count
- TTL: matches the window length so keys expire automatically

Token bucket example fields per client:

- `tokens` (current available tokens)
- `last_refill_timestamp`

Updates must be atomic (e.g., a Redis Lua script or `INCR` + `EXPIRE`) to avoid race conditions when multiple gateway nodes update the same key concurrently.

## 7. Request Flow

```archify
diagrams/sd-ratelimiter-request-flow-sequence.html
```

## 8. Distributed Rate Limiting Challenges

- **Race conditions**: many gateway instances hitting the same counter at once — solved with atomic Redis operations or Lua scripts.
- **Clock drift**: fixed-window algorithms need synchronized time across nodes.
- **Hot keys**: a single very active client can overload one Redis shard — mitigate with local pre-checks or sharding by client id.
- **Fallback behavior**: if the counter store is unreachable, decide whether to fail-open (allow) or fail-closed (deny) based on business risk.

## 9. Scalability Considerations

- Keep the limiter stateless; all shared state lives in Redis/Memcached cluster.
- Use local, approximate counters (with periodic sync) for extremely high QPS clients to reduce Redis load.
- Partition rate-limit keys across a Redis cluster using consistent hashing.

## 10. Tradeoffs

- Accuracy vs performance: sliding window log is precise but memory-heavy; counters are cheaper but approximate.
- Fail-open vs fail-closed when the store is down: availability vs strict protection.
- Per-endpoint vs global limits: finer control adds configuration complexity.

## 11. Common Mistakes

- Implementing rate limiting only in application code on a single server (breaks under horizontal scaling).
- Non-atomic read-then-write counter updates causing race conditions.
- Forgetting to set TTLs, causing unbounded memory growth in the counter store.
- Not returning `Retry-After`, leaving clients to guess when to retry.

## 12. Summary

A rate limiter is a small but latency-critical distributed system. The token bucket algorithm backed by an atomic, shared store like Redis is the standard, interview-friendly solution — it balances burst tolerance, accuracy, and low overhead while remaining consistent across many API servers.
