# Domain-Driven Design: Bounded Contexts and Aggregates

Domain-Driven Design (DDD) is a set of practices for modeling complex business domains in code — its two most interview-relevant concepts are the **bounded context** (where a model's meaning is valid) and the **aggregate** (the consistency boundary for changes within that model).

## Short Answer

A **bounded context** is an explicit boundary within which a specific domain model and its terminology (the "ubiquitous language") apply consistently — the same word (e.g. "Customer") can mean something different in the `Sales` context versus the `Support` context, and that's fine as long as each context is internally consistent. An **aggregate** is a cluster of domain objects (entities + value objects) treated as a single unit for data changes, with one designated **aggregate root** as the only entry point that enforces the cluster's invariants.

## Bounded Contexts: Same Word, Different Meaning

```csharp
// Sales bounded context — "Customer" means a sales lead/account
namespace Sales.Domain
{
    public class Customer
    {
        public string CompanyName { get; set; }
        public decimal CreditLimit { get; set; }
        public List<Opportunity> OpenOpportunities { get; set; }
    }
}

// Support bounded context — "Customer" means a support ticket requester
namespace Support.Domain
{
    public class Customer
    {
        public string ContactEmail { get; set; }
        public SupportTier Tier { get; set; }
        public List<Ticket> OpenTickets { get; set; }
    }
}
```

- Both are legitimately called "Customer," and both are correct — *within their own context*. Trying to force one single, shared `Customer` class to satisfy Sales, Support, and Billing simultaneously is a classic DDD anti-pattern: it becomes a bloated "god object" with fields only some contexts care about, and a change for one team's needs risks breaking another team's usage.
- Bounded contexts map naturally onto microservice boundaries — a `Sales` service and a `Support` service, each with their own `Customer` model, integrating via well-defined contracts (events, APIs) rather than sharing a database table or a class.
- A **Context Map** documents how bounded contexts relate and integrate (e.g. "Support context is a *downstream consumer* of Sales' `CustomerCreated` event, translating it into its own `Customer` shape").

## Aggregates: The Consistency Boundary

```csharp
public class Order // the Aggregate Root - the ONLY entry point into this aggregate
{
    private readonly List<OrderLine> _lines = new();
    public IReadOnlyList<OrderLine> Lines => _lines;
    public OrderStatus Status { get; private set; }

    public void AddLine(Product product, int quantity)
    {
        if (Status != OrderStatus.Draft)
            throw new InvalidOperationException("Cannot modify a submitted order."); // invariant enforced HERE

        _lines.Add(new OrderLine(product.Id, quantity, product.Price));
    }

    public void Submit()
    {
        if (_lines.Count == 0)
            throw new InvalidOperationException("Cannot submit an empty order."); // another invariant
        Status = OrderStatus.Submitted;
    }
}
```

- `OrderLine` objects are only ever reached and modified *through* the `Order` aggregate root — there's no `OrderLineRepository` that lets code add a line directly, bypassing `Order`'s own rules.
- This is what makes an aggregate a genuine **consistency boundary**: every invariant that must hold true (e.g. "an order can't be submitted with zero lines," "lines can't be added after submission") is enforced in exactly one place, the root, instead of scattered across every piece of code that happens to touch an `OrderLine`.
- **Aggregate sizing is a real design decision.** Too large (e.g. one giant `Customer` aggregate holding every order they've ever placed) means loading/locking far more data than a single business operation needs, and creates unnecessary contention between unrelated operations. Too small (splitting things that must always change together) means you lose the ability to enforce a genuine invariant atomically. The rule of thumb: an aggregate should be exactly as large as the set of things that must be transactionally consistent with each other — no larger.

## Why This Matters for Microservices

Bounded contexts give you a principled way to decide *where* a service boundary should go — align services with bounded contexts, not with database tables or organizational charts. Aggregates then tell you the natural transaction boundary *within* a service: one aggregate, one transaction, one consistency guarantee — anything spanning multiple aggregates (or multiple services) needs eventual consistency, typically via domain events or a Saga.

## Common Mistake

Modeling one shared, "canonical" domain class (like a single universal `Customer` or `Product`) used identically across every part of the system. This ignores bounded contexts entirely, and inevitably produces a bloated, tightly-coupled model that every team fights to change safely — the opposite of what DDD is meant to achieve.

## Summary

A bounded context defines where a domain model's language and meaning are valid — different contexts can (and should) model the "same" real-world concept differently. An aggregate is the transactional consistency boundary within a context, with a single root enforcing every invariant for the cluster of objects it owns. Together, these two concepts are what let you carve a large domain into microservices along genuinely meaningful, low-coupling seams instead of arbitrary technical ones.
