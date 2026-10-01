# Anti-Corruption Layer Pattern

An Anti-Corruption Layer (ACL) is a dedicated translation boundary between your own well-designed domain model and an external system's (often messier, legacy, or simply differently-modeled) domain — protecting your model from being gradually "corrupted" by the external system's concepts, naming, and quirks.

## Short Answer

Instead of letting an external system's data shapes, terminology, or quirks leak directly into your own domain model, you introduce a dedicated layer (a set of adapters/translators) that sits between the two — translating the external system's model into your own domain's terms at the boundary, so your core domain code never has to know the external system's model exists at all.

## The Problem Without an ACL

```csharp
// Your domain model, but littered with legacy-system concepts that don't belong here
public class Order
{
    public int LegacyCustNum { get; set; }        // the OLD system's customer ID format
    public string LegacyStatusCode { get; set; }  // "A", "P", "S", "X" - meaningless without the legacy docs
    public decimal AmtCents { get; set; }          // legacy system stores cents as an int-like decimal
}
```

Over time, as more integrations are added directly against the legacy system's shapes, your own domain model slowly absorbs its terminology, quirks, and constraints — eventually your "own" model isn't really yours anymore; it's just a thin, tangled wrapper around someone else's design decisions.

## Applying an Anti-Corruption Layer

```csharp
// Your clean domain model - knows NOTHING about the legacy system
public class Order
{
    public CustomerId CustomerId { get; }
    public OrderStatus Status { get; }      // a proper enum: Pending, Shipped, Cancelled
    public Money Total { get; }             // a proper Money value object
}

// The ACL - the ONLY place that knows about the legacy system's shapes
public class LegacyOrderTranslator
{
    public Order ToDomainOrder(LegacyOrderRecord legacyRecord)
    {
        return new Order(
            customerId: new CustomerId(legacyRecord.LegacyCustNum),
            status: TranslateStatus(legacyRecord.LegacyStatusCode),
            total: Money.FromCents(legacyRecord.AmtCents));
    }

    private OrderStatus TranslateStatus(string legacyCode) => legacyCode switch
    {
        "A" => OrderStatus.Pending,
        "S" => OrderStatus.Shipped,
        "X" => OrderStatus.Cancelled,
        _ => throw new InvalidOperationException($"Unknown legacy status code: {legacyCode}")
    };
}
```

- Every domain-relevant concept (`OrderStatus`, `Money`, `CustomerId`) is expressed cleanly, in your own domain's language — the legacy system's cryptic codes and quirky formats are translated exactly once, at the boundary, and never leak beyond `LegacyOrderTranslator`.
- If the legacy system's format changes (or you eventually replace it with a different system entirely), only the translator needs to change — your entire domain model and everything built on top of it remains completely unaffected.

## Where This Pattern Comes From

The Anti-Corruption Layer is a core pattern from Domain-Driven Design's concept of **bounded contexts** — it's specifically the integration pattern used at the boundary between your bounded context and an external one you don't control (a legacy system, a third-party API, another team's service with a very different model), when you want to preserve your own domain's integrity rather than letting the external system's model bleed through.

## When to Use It

- Integrating with a legacy system, a third-party API, or another team's service whose data model doesn't match (or actively conflicts with) your own domain's model.
- You want to eventually replace or migrate away from the external system — an ACL means that migration only requires rewriting the translator, not every piece of code that touches the domain model.

## Common Mistake

Skipping the ACL "to save time" and letting external system field names, status codes, and quirks flow directly into your domain model and business logic — this feels faster initially, but tangles your domain model's stability to an external system you don't control, and makes any future migration away from that system dramatically more invasive.

## Summary

An Anti-Corruption Layer is a dedicated translation boundary that converts an external system's model into your own domain's terms at the point of integration — keeping your domain model clean, stable, and insulated from an external system's quirks, naming, and future changes. It's one of the most practically important patterns for architects doing legacy integration or working across team/system boundaries.
