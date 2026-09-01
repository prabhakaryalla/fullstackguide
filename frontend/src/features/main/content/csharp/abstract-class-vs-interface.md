# Difference Between Abstract Class and Interface in C#

Both abstract classes and interfaces help you design flexible code. They are similar, but they solve slightly different problems.

## Quick Difference

- Abstract class: Use when classes share common state or common base behavior.
- Interface: Use when classes only need to follow a common contract.

## Feature Comparison

| Feature | Abstract Class | Interface |
|:---|:---|:---|
| Can have fields/state | Yes | No instance fields |
| Can have constructor | Yes | No |
| Can have implemented methods | Yes | Yes (default methods in modern C#), but no instance state |
| Inheritance count | One base class only | Multiple interfaces allowed |
| Typical purpose | Shared base + partial implementation | Capability/contract definition |

## When to Choose Abstract Class

Use an abstract class when you need:

- Common properties and validation logic
- Shared constructor logic
- A strong base type relationship

```csharp
public abstract class Document
{
    public string Name { get; }

    protected Document(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name is required", nameof(name));

        Name = name;
    }

    public virtual string GetDisplayName() => Name;
    public abstract string GetFileExtension();
}

public sealed class PdfDocument : Document
{
    public PdfDocument(string name) : base(name)
    {
    }

    public override string GetFileExtension() => ".pdf";
}
```

Here, Document gives shared state and behavior to all derived document types.

## When to Choose Interface

Use an interface when you need:

- A common contract across unrelated classes
- Multiple capabilities on one class
- Loose coupling for testing and dependency injection

```csharp
public interface IExportable
{
    byte[] Export();
}

public sealed class Invoice : IExportable
{
    public byte[] Export() => new byte[] { 1, 2, 3 };
}

public sealed class Report : IExportable
{
    public byte[] Export() => new byte[] { 9, 8, 7 };
}
```

Invoice and Report are unrelated types, but both support the same export contract.

## Using Both Together

In real projects, you often combine them.

```csharp
public interface IAuditable
{
    DateTime LastUpdatedUtc { get; }
}

public abstract class EntityBase
{
    public Guid Id { get; } = Guid.NewGuid();
}

public sealed class Order : EntityBase, IAuditable
{
    public DateTime LastUpdatedUtc { get; private set; } = DateTime.UtcNow;
}
```

Order gets shared entity behavior from the abstract class and capability contract from the interface.

## Rule of Thumb

- Need shared data or constructor logic? Choose abstract class.
- Need a contract across many unrelated types? Choose interface.
- Need both? Use both.

## Real-World Analogy

Abstract class is like a standard training program inside one company role family, where everyone gets the same base onboarding.

Interface is like a professional certification. Different people from different companies can hold the same certification and follow the same standards.
