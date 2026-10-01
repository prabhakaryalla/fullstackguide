# Microservices vs Monolith: How Do You Decide?

Neither architecture is universally "better" — a monolith optimizes for simplicity and development speed early on, while microservices trade that simplicity for independent scalability, deployability, and team autonomy at a real operational cost.

## Short Answer

Start with a well-structured monolith (ideally one with clean internal module boundaries, per Clean/Onion Architecture). Move to microservices only when you have a *specific, demonstrated* pain point — independent scaling needs, independent deployment cadence across teams, or genuinely different technology/reliability requirements per component — that a monolith can no longer satisfy. Splitting too early is one of the most common, most expensive architecture mistakes.

## What You Gain With Microservices

- **Independent deployability** — ship the `Orders` service without redeploying `Inventory` or `Billing`.
- **Independent scaling** — scale the read-heavy `Catalog` service to 50 instances while `Billing` stays at 3.
- **Technology and team autonomy** — one team can use a different language/database if it's genuinely the right tool, and teams can move at their own release cadence.
- **Fault isolation** — a memory leak or crash in one service doesn't necessarily take down the whole system (if you've also built in resilience — see Circuit Breaker/Retry/Bulkhead).

## What You Pay For It

- **Distributed system complexity** — network calls can fail in ways in-process calls never do (partial failure, timeouts, retries needed everywhere).
- **Data consistency across services** — no single database transaction spans multiple services; you need patterns like Saga instead of a simple `SaveChanges()`.
- **Operational overhead** — service discovery, distributed tracing, centralized logging, per-service CI/CD pipelines, container orchestration (Kubernetes) — all real, ongoing engineering investment.
- **Testing complexity** — integration tests now need multiple services running together (or extensive contract testing) instead of one in-process test host.

## A Practical Decision Framework

| Signal | Leans Monolith | Leans Microservices |
|---|---|---|
| Team size | Single team, < ~10 engineers | Multiple independent teams |
| Deployment cadence | Whole app ships together, that's fine | Different parts need to ship on different schedules |
| Scaling needs | Uniform load across the app | Wildly different load per component (e.g. search vs checkout) |
| Domain maturity | Still discovering bounded contexts | Bounded contexts are well understood and stable |
| Operational maturity | Limited DevOps/platform investment so far | Existing investment in Kubernetes, observability, CI/CD pipelines |

## The Middle Ground: A Modular Monolith

```csharp
// Enforced module boundaries within a single deployable, using internal + project references
namespace Orders.Domain
{
    internal class Order { /* ... */ } // not accessible outside the Orders module

    public interface IOrderService // the only thing other modules can see
    {
        Task<OrderSummary> PlaceOrderAsync(PlaceOrderRequest request);
    }
}
```

A modular monolith — one deployable unit, but with strict internal module boundaries (via project structure, `internal` access, or a tool like enforced architecture tests) — gives you most of the maintainability benefits of microservices (clear boundaries, low coupling) without the distributed-systems tax. It's also the natural stepping stone: when a module genuinely needs to become its own service later, well-defined boundaries make that extraction far less painful than untangling a "big ball of mud."

## Common Mistake

Adopting microservices upfront on a new, unproven product because "that's what big tech companies do." Netflix and Amazon didn't start as hundreds of microservices — they grew into that architecture once monoliths stopped meeting *specific, measured* needs. Premature microservices adds all the distributed-systems cost with none of the payoff, since the bounded contexts usually aren't even stable yet in a brand-new product.

## Summary

Default to a well-modularized monolith. Split into microservices only when a monolith demonstrably can't meet a specific need — team autonomy at scale, wildly uneven load per component, or genuinely independent deployment cadences — and be honest about the real operational cost (distributed data consistency, observability, deployment pipelines) that split brings with it.
