# What Happens If You Register the Same Service with Multiple Lifetimes?

In .NET dependency injection, if you register the same service type multiple times, registration order and resolution style matter.

## Short Answer

- For single service resolution (GetService<T> or constructor injection of T), the last registration usually wins.
- For IEnumerable<T> resolution, all registrations are returned in registration order.

## Example Registrations

```csharp
builder.Services.AddSingleton<IClock, UtcClock>();
builder.Services.AddScoped<IClock, RequestClock>();
builder.Services.AddTransient<IClock, DebugClock>();
```

Here IClock is registered three times with different lifetimes.

## What You Get at Runtime

### 1. Injecting single IClock

```csharp
public class Consumer
{
    public Consumer(IClock clock)
    {
        // Usually receives DebugClock (last registration)
    }
}
```

The final registration typically becomes the default for single resolution.

### 2. Injecting IEnumerable<IClock>

```csharp
public class MultiConsumer
{
    public MultiConsumer(IEnumerable<IClock> clocks)
    {
        // Receives UtcClock, RequestClock, DebugClock in registration order
    }
}
```

All implementations are available when resolving IEnumerable<T>.

## Why This Can Be Risky

Mixing lifetimes for the same service contract can create confusion:

- Different consumers may observe different behavior
- Debugging becomes harder
- Lifetime mismatches can lead to subtle bugs

## Good Practices

- Use one clear default registration per interface unless multiple implementations are intentional.
- If multiple implementations are needed, inject IEnumerable<T> or use explicit keyed/named patterns.
- Keep lifetime strategy consistent with service behavior.

## Lifetime Safety Reminder

Even if last registration wins, lifetime rules still apply.

For example, if the effective service is scoped, injecting it into singleton consumers is still invalid.

## Real-World Analogy

Think of registering multiple lifetimes as assigning the same role to three employees with different shift rules.

If someone asks for one person, the latest assignment is picked by default.

If someone asks for the full team list, they get all assigned employees in the order they were added.
