# What is Provisioned Throughput (PTU) in Azure OpenAI, and How Does It Differ From Pay-As-You-Go?

Azure OpenAI offers two fundamentally different pricing/capacity models — pay-as-you-go's shared, best-effort capacity versus Provisioned Throughput Units' dedicated, reserved capacity — and choosing wrong causes either unpredictable throttling or unnecessary cost.

## Short Answer

**Pay-As-You-Go (Standard)** deployments draw from a shared pool of capacity, billed per token consumed — simple and flexible, but subject to rate limits and potential throttling (`429` responses) during high-demand periods across Azure's entire customer base, not just your own usage. **Provisioned Throughput Units (PTU)** reserve a dedicated, guaranteed amount of model capacity exclusively for your deployment, billed as a fixed hourly/monthly commitment regardless of actual usage — giving predictable latency and guaranteed throughput, at a cost that doesn't scale down even if you use less than the reserved capacity.

## Pay-As-You-Go

```
Billing: per 1K/1M input and output tokens actually consumed
Capacity: shared pool, subject to per-deployment rate limits (TPM/RPM - tokens/requests per minute)
Behavior under load: requests beyond your rate limit get a 429 (throttled), requiring retry with backoff
```

- No upfront commitment — you only pay for tokens actually used, making it the natural default for variable, unpredictable, or low-to-moderate volume workloads.
- Rate limits (Tokens Per Minute / Requests Per Minute) are configured per deployment, but ultimately still draw from Azure's overall shared capacity for that model/region — during periods of very high regional demand, you can experience throttling even within your own configured rate limit, since the underlying shared infrastructure has its own capacity constraints.
- Latency and throughput are "best effort," not contractually guaranteed — fine for most applications, but a real risk for latency-sensitive or high-volume production workloads with strict SLAs.

## Provisioned Throughput Units (PTU)

```
Billing: fixed cost per PTU, per hour/month, REGARDLESS of actual token usage that period
Capacity: dedicated, reserved model capacity - not shared with other Azure customers
Behavior under load: consistent, predictable latency and throughput, up to the reserved capacity
```

- You purchase a specific number of PTUs (a unit representing a guaranteed amount of throughput capacity for a specific model), and that capacity is reserved exclusively for your deployment — it doesn't compete with other customers' traffic for the same underlying infrastructure.
- The cost is fixed regardless of usage — if you provision more PTUs than you actually consume, you're still paying the full reserved amount; conversely, if demand exceeds your provisioned PTUs, requests beyond that capacity are throttled just like exceeding a pay-as-you-go rate limit.
- Appropriate for production workloads with **high, sustained, predictable volume**, where consistent low-latency response times matter (customer-facing chat at scale) and the cost of reserved capacity is justified by that volume and predictability requirement.

## Choosing Between Them

| Workload Characteristic | Best Fit |
|---|---|
| Low-to-moderate, variable volume | Pay-As-You-Go |
| Development/testing/prototyping | Pay-As-You-Go |
| High-volume, latency-sensitive production traffic | PTU |
| Predictable, sustained daily demand justifying a fixed reservation cost | PTU |
| Cost needs to scale down during quiet periods | Pay-As-You-Go |

## Hybrid Approach: PTU for Baseline, Pay-As-You-Go for Overflow

```
Baseline (predictable daily traffic): served by PTU deployment (guaranteed capacity)
Burst/overflow (above the provisioned capacity): falls back to a Pay-As-You-Go deployment
```

A common production pattern provisions PTU capacity sized for typical/baseline traffic, with application-level logic that falls back to a Pay-As-You-Go deployment of the same model for traffic spikes beyond the reserved capacity — combining PTU's predictable baseline performance with Pay-As-You-Go's elastic overflow handling, rather than over-provisioning PTUs to cover rare peak demand.

## Common Mistake

Purchasing PTUs based on peak/worst-case estimated demand "to be safe," without measuring actual sustained usage first — since PTU cost is fixed regardless of consumption, over-provisioning for a rarely-hit peak wastes significant ongoing spend for capacity that sits idle most of the time. It's generally safer to start on Pay-As-You-Go, measure real sustained demand, and provision PTUs sized to that measured baseline (with overflow handling for genuine spikes) rather than guessing upfront.

## Summary

Pay-As-You-Go offers simple, flexible, usage-based billing from shared capacity — good for variable or lower-volume workloads, at the cost of best-effort throughput guarantees. PTU reserves dedicated capacity for guaranteed, predictable throughput and latency at a fixed cost regardless of actual usage — appropriate for high-volume, latency-sensitive production workloads where that predictability is worth paying for even during quieter periods.
