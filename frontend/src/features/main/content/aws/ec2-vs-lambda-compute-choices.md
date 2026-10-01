# EC2 vs Lambda: Choosing Compute

EC2 gives you a full virtual machine you manage yourself; Lambda runs your code in response to events with zero server management. The choice comes down to control vs convenience, and how your workload's traffic pattern actually behaves.

## Short Answer

Use **EC2** when you need full control over the OS/runtime, long-running processes, specialized hardware (GPUs), or predictable, steady/high-throughput traffic where a dedicated always-on instance is more cost-effective. Use **Lambda** for event-driven, short-lived, bursty, or unpredictable workloads where you don't want to manage servers at all, and where you only want to pay for actual execution time.

## Core Differences

| | EC2 | Lambda |
|---|---|---|
| Management | You patch OS, manage scaling, configure networking | Fully managed — no server to patch or provision |
| Execution model | Always running (unless stopped) | Runs only in response to a trigger, then stops |
| Max execution time | Unlimited (runs indefinitely) | 15 minutes per invocation (hard limit) |
| Billing | Per second/hour the instance is running, regardless of load | Per invocation + per millisecond of actual execution time |
| Scaling | Manual, or via Auto Scaling Groups (takes minutes to add capacity) | Automatic, near-instant, scales down to zero when idle |
| State | Can maintain in-memory state across requests (same instance) | Stateless between invocations (state must live externally — DB, cache) |
| Cold start | None (already running) | Possible cold start latency on the first invocation after idle |

## When EC2 Wins

```
- A service handling constant, high, predictable traffic 24/7 — a reserved/always-on EC2
  fleet is cheaper per-request than paying Lambda's per-invocation overhead at that volume.
- Long-running background processing (hours), which Lambda's 15-minute cap can't support directly.
- Workloads needing specific OS-level configuration, custom kernel modules, or GPU instances.
- Latency-critical workloads that cannot tolerate any cold-start variance.
```

## When Lambda Wins

```
- Event-driven glue code: "when a file lands in S3, resize it," "when an SQS message arrives, process it."
- Highly variable or spiky traffic — Lambda scales to zero when idle, so you pay nothing during quiet periods.
- Small, independent units of work that don't need to share in-memory state between invocations.
- Teams that want zero infrastructure/patching overhead for a given piece of functionality.
```

## The Cost Crossover Point

At low, spiky traffic, Lambda is almost always cheaper — you pay nothing while idle, whereas an EC2 instance bills continuously whether it's serving traffic or not. At sustained, high, predictable traffic, a right-sized (or Reserved Instance) EC2 fleet often becomes cheaper per request than the equivalent volume of Lambda invocations — there's a real crossover point, and "just use Lambda for everything" isn't always the cost-optimal answer at scale.

## Common Mistake

Assuming Lambda is strictly "the modern, better choice" and EC2 is legacy. Neither is universally correct — Lambda's execution time cap, statelessness, and cold starts make it a poor fit for some workloads (long batch jobs, workloads needing persistent in-memory caches, ultra-low and consistent latency requirements) where EC2 (or a container platform like ECS/EKS/Fargate) is the better-suited tool.

## Summary

EC2 trades convenience for control: you manage the server, but get predictable performance, no execution time limits, and can be more cost-effective at steady, high volume. Lambda trades control for convenience: fully managed, scales to zero, pay-per-use — ideal for event-driven, bursty, short-lived workloads, but constrained by a 15-minute execution cap, statelessness, and potential cold-start latency.
