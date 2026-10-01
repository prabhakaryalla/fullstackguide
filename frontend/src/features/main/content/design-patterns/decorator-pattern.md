# Decorator Pattern

The Decorator pattern lets you add new behavior to an individual object dynamically, by wrapping it in another object that implements the same interface — without touching the original class, and without every possible combination of behaviors needing its own subclass.

## Short Answer

A decorator implements the same interface as the object it wraps, holds a reference to that wrapped object, and adds behavior before/after delegating the actual call to it. Multiple decorators can be layered on top of each other, each adding one independent piece of behavior, composing freely at runtime.

## The Problem Without Decorator

```csharp
class Coffee { }
class CoffeeWithMilk : Coffee { }
class CoffeeWithSugar : Coffee { }
class CoffeeWithMilkAndSugar : Coffee { }
class CoffeeWithMilkAndSugarAndWhippedCream : Coffee { } // ...this explodes combinatorially
```

Every new combination of add-ons requires its own subclass — the number of classes grows exponentially with the number of independent options.

## Applying Decorator

```csharp
public interface IBeverage
{
    string GetDescription();
    decimal GetCost();
}

public class Coffee : IBeverage
{
    public string GetDescription() => "Coffee";
    public decimal GetCost() => 2.00m;
}

public abstract class BeverageDecorator : IBeverage
{
    protected readonly IBeverage _beverage;
    protected BeverageDecorator(IBeverage beverage) => _beverage = beverage;
    public abstract string GetDescription();
    public abstract decimal GetCost();
}

public class MilkDecorator : BeverageDecorator
{
    public MilkDecorator(IBeverage beverage) : base(beverage) { }
    public override string GetDescription() => _beverage.GetDescription() + " + Milk";
    public override decimal GetCost() => _beverage.GetCost() + 0.50m;
}

public class SugarDecorator : BeverageDecorator
{
    public SugarDecorator(IBeverage beverage) : base(beverage) { }
    public override string GetDescription() => _beverage.GetDescription() + " + Sugar";
    public override decimal GetCost() => _beverage.GetCost() + 0.25m;
}

IBeverage order = new SugarDecorator(new MilkDecorator(new Coffee()));
Console.WriteLine(order.GetDescription()); // "Coffee + Milk + Sugar"
Console.WriteLine(order.GetCost());        // 2.75
```

- Any combination of add-ons is just a different order of wrapping — no combinatorial explosion of subclasses, and new add-ons only require one new decorator class, independent of every existing one.
- Each decorator only knows about the single interface (`IBeverage`) — it has no idea whether it's wrapping the base `Coffee` or another decorator, which is exactly what allows arbitrary stacking.

## A Real-World .NET Example: Stream Decorators

```csharp
Stream fileStream = File.OpenRead("data.txt");
Stream compressed = new GZipStream(fileStream, CompressionMode.Compress);
Stream encrypted = new CryptoStream(compressed, encryptor, CryptoStreamMode.Write);
```

`System.IO.Stream` is a textbook real-world Decorator implementation — `GZipStream` and `CryptoStream` both wrap another `Stream` and add their own behavior (compression, encryption) while still exposing the same `Stream` interface, letting you layer them in any combination.

## When to Use It

- You need to add optional, combinable behaviors to individual objects, and subclassing for every combination would explode combinatorially.
- You want to add/remove a behavior at runtime, per-instance, rather than baking it into a fixed class hierarchy at compile time.

## Common Mistake

Reaching for Decorator when a simple, single extra behavior (not a combination of several) is needed — a straightforward subclass or a single wrapper method is often simpler and clearer when there's no actual need to compose multiple independent behaviors together.

## Summary

Decorator wraps an object behind the same interface it implements, adding behavior around delegated calls — and because decorators can wrap other decorators, any combination of behaviors becomes a simple stacking order instead of a dedicated subclass, avoiding the combinatorial explosion that inheritance-per-combination would cause.
