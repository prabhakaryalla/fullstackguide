# Azure Functions

Azure Functions is a serverless, event-driven compute service — you deploy a single function's code, and Azure handles provisioning, scaling instances up and down (including to zero), and billing based on actual execution, without you managing a VM or container fleet.

## Short Answer

- Functions run in response to **triggers** (HTTP, timer, queue, blob, etc.) and scale automatically based on incoming events.
- The **Consumption plan** bills per-execution and scales to zero (no traffic = no cost), but introduces **cold starts** and has a default execution timeout.
- Use Functions for short-lived, event-triggered, bursty workloads; move to App Service, AKS, or Azure Container Apps when you need long-running processes, full control over the host, or predictable low-latency response times under constant load.

## Triggers

- HTTP trigger
- Timer trigger
- Blob storage trigger
- Service Bus trigger

## Example: HTTP Trigger

```csharp
[FunctionName("HelloWorld")]
public static IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequest req)
{
    return new OkObjectResult("Hello, World!");
}
```

## Hosting Plans: Cost vs. Cold Start vs. Control

| Plan | Scales to zero? | Cold start | Execution timeout | When to use |
|---|---|---|---|---|
| **Consumption** | Yes | Noticeable (seconds, worse for .NET/Java than Node/Python) — the runtime has to spin up a fresh instance and load your app | 5 min default (max 10 min) | Spiky, infrequent, cost-sensitive workloads where occasional cold-start latency is acceptable |
| **Premium** | No (keeps "pre-warmed" instances) | Effectively none — pays to keep instances ready | Up to 60 min (configurable, no hard cap like Consumption) | Latency-sensitive triggers, VNet integration requirements, or workloads needing longer execution |
| **Dedicated (App Service Plan)** | No | None (already running) | No Functions-imposed limit | You're already running App Service instances and want Functions to share that capacity |

## Cold Starts: Why They Happen and How to Reduce Them

On the Consumption plan, when no instance has recently handled a request, Azure must allocate a new instance, start the language runtime, and load your function's assemblies before the first line of your code runs — this can add hundreds of milliseconds to several seconds, and is worse for runtimes with heavier startup cost (.NET, Java) than lighter ones (Node.js, Python). Mitigations: use the Premium plan's pre-warmed instances if cold starts are unacceptable for user-facing paths, keep function app size/dependencies small, and avoid Consumption plan for latency-sensitive synchronous HTTP APIs that users wait on directly.

## State Management

Individual function invocations are stateless — each execution starts fresh with no memory of previous calls. For workflows that need to coordinate multiple steps, retry with state, or run for a long time, use **Durable Functions** (an extension providing stateful orchestration on top of the same Functions runtime) rather than trying to hand-roll state persistence.

```archify
diagrams/azure-durable-functions-orchestration.html
```

## Cost Model

- **Consumption**: pay per execution (a per-GB-second of memory/duration metric) plus a small per-million-executions charge — no traffic means no compute cost, only storage for the function app itself.
- **Premium/Dedicated**: pay for allocated instances continuously, regardless of execution volume — predictable cost, but you're paying even during idle periods, in exchange for no cold starts.

## When NOT to Use Azure Functions

- **Long-running, CPU-bound processes**: the Consumption plan's timeout (and the general execution model) isn't designed for multi-hour batch jobs — use a dedicated worker (App Service, Container Apps, or a VM) instead.
- **Workloads needing consistent, low sub-100ms latency on every request**: cold starts on Consumption make this unreliable; either use Premium or a different hosting model entirely.
- **Complex stateful workflows without Durable Functions**: plain Functions have no built-in state between invocations — reach for Durable Functions or a dedicated orchestrator rather than working around statelessness with ad hoc external storage.

## Interview Answer

Azure Functions is a serverless compute service that scales automatically based on triggers and bills per execution on the Consumption plan. The key tradeoff to mention is cold starts: Consumption scales to zero, which is cost-efficient but adds latency when a new instance needs to spin up, whereas the Premium plan keeps instances warm at a higher baseline cost. I'd choose Functions for event-driven, bursty, short-lived work, and move to App Service/Container Apps/AKS for long-running or consistently latency-sensitive workloads.

## Summary

Azure Functions trades operational overhead for cold-start latency and execution-time limits: you get automatic, granular scaling and pay-per-execution billing, but the Consumption plan's cold starts and timeout make it the wrong choice for long-running or strictly latency-sensitive synchronous workloads — the Premium plan (or a different hosting model entirely) trades that cost efficiency back for predictable low latency.

