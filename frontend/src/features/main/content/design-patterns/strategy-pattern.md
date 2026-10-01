# Strategy Pattern

The Strategy pattern lets you swap out an algorithm's implementation at runtime by encapsulating each variant behind a common interface — instead of a growing `if`/`switch` block choosing behavior inline.

## Short Answer

Define an interface representing "an algorithm" (a single method, typically), implement each variant as its own class, and have the consumer hold a reference to the interface rather than a specific implementation. Which concrete strategy is used can be swapped at runtime (via constructor injection, a setter, or configuration) without changing the code that uses it.

## The Problem Without Strategy

```csharp
public decimal CalculateShipping(Order order, string method)
{
    if (method == "standard") return order.Weight * 0.5m;
    if (method == "express") return order.Weight * 1.5m + 10m;
    if (method == "overnight") return order.Weight * 3m + 25m;
    throw new ArgumentException("Unknown shipping method");
}
```

Every new shipping method requires editing this method directly, and the logic for unrelated shipping methods all lives tangled together in one growing conditional.

## Applying Strategy

```csharp
public interface IShippingStrategy
{
    decimal CalculateCost(Order order);
}

public class StandardShipping : IShippingStrategy
{
    public decimal CalculateCost(Order order) => order.Weight * 0.5m;
}

public class ExpressShipping : IShippingStrategy
{
    public decimal CalculateCost(Order order) => order.Weight * 1.5m + 10m;
}

public class ShippingCalculator
{
    private readonly IShippingStrategy _strategy;
    public ShippingCalculator(IShippingStrategy strategy) => _strategy = strategy;

    public decimal Calculate(Order order) => _strategy.CalculateCost(order);
}

var calculator = new ShippingCalculator(new ExpressShipping());
var cost = calculator.Calculate(order);
```

- Each shipping method is now its own class, testable in isolation, with no shared conditional to accidentally break when adding a new one.
- Adding a new shipping method means adding a new class — the existing `ShippingCalculator` and every existing strategy stay completely untouched (satisfying the Open/Closed Principle).

## When to Use It

- You have a family of related algorithms/behaviors that a caller needs to choose between, and that choice may need to change at runtime (e.g. based on configuration, user selection, or A/B testing).
- You notice a large conditional (`if`/`switch`) selecting between different implementations of "the same conceptual operation" — that's the classic signal Strategy applies.

## Common Mistake

Using Strategy for behavior that never actually varies, or only has one real implementation "just in case" a second one is needed someday — this adds an interface and indirection for no real benefit. Strategy earns its complexity specifically when there are (or will genuinely soon be) multiple interchangeable implementations.

## Summary

Strategy replaces a conditional choosing between algorithm variants with a common interface and one class per variant, letting the concrete implementation be selected/swapped at runtime without touching the calling code. It directly targets the "growing if/switch selecting behavior" smell, trading it for small, independently testable classes.
