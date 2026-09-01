# Singleton Vs Static Classes

Singleton and static classes can both provide global access, but they are not the same.

## Quick Difference

- Singleton: one object instance for the whole application.
- Static class: no object instance at all.

## Comparison Table

| Area | Singleton | Static Class |
|:---|:---|:---|
| Instance | Exactly one instance | No instance |
| Supports interfaces | Yes | No |
| Can use dependency injection | Yes | No direct injection |
| Can hold state | Yes | Yes (static state) |
| Can be inherited | No (usually sealed) | No |
| Best for | Service-like shared object | Utility/helper methods |

## Singleton Example

```csharp
public interface IClock
{
    DateTime UtcNow();
}

public sealed class AppClock : IClock
{
    private static readonly Lazy<AppClock> _instance =
        new Lazy<AppClock>(() => new AppClock());

    public static AppClock Instance => _instance.Value;

    private AppClock()
    {
    }

    public DateTime UtcNow() => DateTime.UtcNow;
}
```

Why this is a singleton:

- Constructor is private, so no external object creation.
- Instance property always returns the same object.
- You can still implement interfaces for testing and abstraction.

## Static Class Example

```csharp
public static class DateFormatting
{
    public static string ToIsoDate(DateTime value)
    {
        return value.ToString("yyyy-MM-dd");
    }
}
```

Why this is static:

- Class cannot be instantiated.
- Members must be static.
- Good for stateless helper logic.

## Key Design Impact

Singleton can participate in object-oriented design patterns better than static classes because singleton can implement interfaces and can be replaced in tests.

Static classes are simpler for pure helper functions, but they can make testing harder when used for external dependencies.

## When to Use What

Use singleton when:

- You need one shared service instance.
- You want interface-based design.
- You need to mock or replace behavior in tests.

Use static class when:

- Logic is pure utility logic.
- No external dependency or mock is needed.
- You want simple reusable helper methods.

## Real-World Analogy

Singleton is like one office receptionist for the whole office. There is one person, but still a real person with behavior and responsibilities.

Static class is like a wall poster with fixed instructions. It is always available, but it is not a person and has no instance lifecycle.
