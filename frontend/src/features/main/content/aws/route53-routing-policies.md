# Route 53 Routing Policies

Route 53 is AWS's DNS service, and its routing policies control *how* it answers a DNS query when multiple possible targets exist — not just "what's the IP for this domain," but "which of several IPs should this particular user get, and why."

## Short Answer

Route 53 supports several routing policies beyond a simple one-record-one-answer setup: **Simple** (no logic, just returns the record(s)), **Weighted** (splits traffic by percentage, useful for gradual rollouts), **Latency-based** (routes to whichever region responds fastest for that user), **Failover** (routes to a backup only if the primary is unhealthy), **Geolocation**/**Geoproximity** (routes based on the user's location), and **Multivalue Answer** (returns several healthy records, with basic health-check-aware load distribution).

## Simple Routing

```
example.com → 203.0.113.10
```

- No special logic — if multiple values are configured, DNS returns all of them and the client picks one (typically the first, or randomly, depending on the client). No health checking, no weighting.

## Weighted Routing

```
example.com  weight=90  → app-v1.example.com   (90% of traffic)
example.com  weight=10  → app-v2.example.com   (10% of traffic - canary release)
```

- Splits traffic across multiple targets by relative weight — the classic use case is a canary/gradual rollout: send a small percentage of real traffic to a new version, and increase the weight over time as confidence grows.

## Latency-Based Routing

```
example.com (us-east-1)      → ALB in Virginia
example.com (ap-south-1)     → ALB in Mumbai
```

- Routes each user to whichever configured region gives them the **lowest network latency**, based on AWS's own latency measurements between regions and DNS resolver locations — not simply "closest by distance," but genuinely fastest by measured latency.

## Failover Routing

```
Primary:   example.com → ALB (us-east-1)     — health-checked
Secondary: example.com → ALB (us-west-2)     — only returned if the primary fails its health check
```

- Requires an associated Route 53 health check on the primary record — as long as the primary is healthy, all traffic goes there; the secondary is only returned once the primary starts failing its health checks, implementing basic DNS-level disaster recovery failover.

## Geolocation and Geoproximity Routing

```
example.com  (Continent: Europe)  → eu-west-1 ALB   (data residency requirement)
example.com  (Country: default)    → us-east-1 ALB
```

- **Geolocation**: routes based on the user's actual geographic location (country/continent) — commonly used for regulatory/compliance reasons (e.g. EU users must be served from an EU region) rather than pure performance.
- **Geoproximity** (via traffic flow): similar, but lets you bias traffic toward or away from a region using a "bias" value, shifting more or less traffic without a hard geographic boundary.

## Multivalue Answer Routing

```
example.com → [10.0.0.1 (healthy), 10.0.0.2 (healthy), 10.0.0.3 (unhealthy, excluded)]
```

- Returns multiple healthy records (up to 8) per query, each individually health-checked — provides basic client-side load distribution and availability, though it's not a substitute for a real load balancer's more sophisticated traffic management.

## Choosing the Right Policy

| Need | Best Fit |
|---|---|
| Simple single-target setup, no special logic | Simple |
| Gradual rollout / canary release | Weighted |
| Route to the fastest region for each user | Latency-based |
| Automatic DNS-level disaster recovery | Failover |
| Compliance/data-residency by user location | Geolocation |
| Basic multi-target availability without a full load balancer | Multivalue Answer |

## Common Mistake

Using Failover routing without an actual, meaningful health check configured on the primary — without a health check, Route 53 has no signal to know the primary is down, and traffic keeps flowing to a dead endpoint indefinitely, defeating the entire purpose of the failover policy.

## Summary

Route 53's routing policies go well beyond simple DNS resolution — Weighted enables gradual rollouts, Latency-based optimizes for speed, Failover provides DNS-level disaster recovery (with a health check), Geolocation addresses compliance/data-residency needs, and Multivalue Answer gives lightweight, health-check-aware multi-target distribution. Picking the right one depends on whether the goal is performance, availability, compliance, or controlled rollout.
