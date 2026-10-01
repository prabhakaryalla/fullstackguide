# Design and Setup Considerations When Adding a New Service Layer to an Existing .NET Application

Introducing a new service layer for a feature isn't just "add a class" — it's about keeping the addition consistent with the app's existing architecture, testable, and safe to extend later without becoming another tangle of dependencies.

## Short Answer

Before writing the feature, decide: where it fits in the existing layering, what its public contract (interface) looks like, how it's registered with DI, how it handles cross-cutting concerns (logging, validation, transactions), and how it will be tested in isolation.

## 1. Respect Existing Layering

Identify where the new service sits relative to existing layers (Controllers/API → Services → Repositories/Data Access) and keep dependencies flowing in one direction only.

```archify
diagrams/dotnet-new-service-layer.html
```

- Avoid the new service reaching back "up" into controllers or "sideways" into unrelated services directly — go through existing shared abstractions instead.

## 2. Define a Clear Interface/Contract First

```csharp
public interface IOrderPricingService
{
    Task<PricingResult> CalculatePriceAsync(OrderRequest request, CancellationToken ct);
}
```

- Depend on the interface everywhere, not the concrete class — keeps the service swappable and mockable in tests.
- Keep the contract focused on one responsibility (Single Responsibility Principle) rather than becoming a catch-all.

## 3. Dependency Injection & Lifetime

Choose the correct DI lifetime deliberately — this is a common source of subtle bugs:

| Lifetime | Use When |
|---|---|
| Transient | Stateless, cheap to create (most services) |
| Scoped | Needs a `DbContext` or per-request state |
| Singleton | Truly stateless and thread-safe, or caches an expensive resource |

```csharp
builder.Services.AddScoped<IOrderPricingService, OrderPricingService>();
```

- Watch for **captive dependencies** — never inject a scoped/transient service into a singleton without care (it gets "captured" for the app's lifetime).

## 4. Cross-Cutting Concerns

- **Validation** — validate inputs at the service boundary (FluentValidation or manual guards), not just at the controller.
- **Logging/telemetry** — inject `ILogger<T>` and add structured logs at key decision points; consider distributed tracing if the service calls external systems.
- **Error handling** — decide whether the service throws domain exceptions, returns a Result type, or both — and be consistent with the rest of the app's convention.
- **Transactions** — if the service spans multiple repository calls that must succeed/fail together, wrap them in a transaction (`DbContext.Database.BeginTransactionAsync` or a Unit of Work).

## 5. Testability

```csharp
public class OrderPricingServiceTests
{
    [Fact]
    public async Task CalculatePriceAsync_AppliesDiscount_WhenEligible()
    {
        var repo = Substitute.For<IDiscountRepository>();
        var sut = new OrderPricingService(repo);

        var result = await sut.CalculatePriceAsync(new OrderRequest { /* ... */ }, default);

        Assert.Equal(expected, result.FinalPrice);
    }
}
```

- Depending on interfaces (not concrete classes/statics) makes the new service unit-testable without spinning up the whole app.
- Avoid `static` helper classes for anything with a dependency — they can't be mocked.

## 6. Configuration & Feature Flags

- If the feature is being rolled out gradually, wire it behind a feature flag (`IFeatureManager` or config-driven toggle) so it can be disabled without a redeploy.
- Externalize any tunable values (timeouts, thresholds) via `IOptions<T>` rather than hardcoding.

## Sequence: Where the New Service Fits

```archify
diagrams/dotnet-new-service-sequence.html
```

## Real-World Example

Adding a "loyalty points calculation" feature to an existing e-commerce API: the team defines `ILoyaltyPointsService`, registers it as `Scoped` (it uses the existing `DbContext`), validates input at the top of the method, wraps the points-award + ledger-write in a transaction, logs the calculation decision for auditability, and covers it with unit tests using a mocked repository — all without touching the existing order or pricing services directly.

## Summary

A new service layer should slot cleanly into existing architectural boundaries: a focused interface, correct DI lifetime, consistent error handling/logging conventions, and a design that's testable in isolation — rather than a quick concrete class wired up ad hoc.
