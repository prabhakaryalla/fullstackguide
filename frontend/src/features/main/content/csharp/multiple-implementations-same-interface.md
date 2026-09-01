# Register Multiple Implementations of the Same Interface Properly in C#

In .NET DI, you can register multiple implementations for the same interface. The key is to resolve them correctly for your use case.

## Basic Registration

```csharp
builder.Services.AddScoped<INotificationSender, EmailSender>();
builder.Services.AddScoped<INotificationSender, SmsSender>();
builder.Services.AddScoped<INotificationSender, PushSender>();
```

This stores three registrations for INotificationSender.

## How Resolution Works

- Injecting INotificationSender (single) usually returns the last registration.
- Injecting IEnumerable<INotificationSender> returns all registrations in order.

```csharp
public class NotificationOrchestrator
{
    private readonly IEnumerable<INotificationSender> _senders;

    public NotificationOrchestrator(IEnumerable<INotificationSender> senders)
    {
        _senders = senders;
    }

    public async Task SendAllAsync(string message)
    {
        foreach (var sender in _senders)
        {
            await sender.SendAsync(message);
        }
    }
}
```

## Selecting One Implementation Properly

### Option 1: Strategy selector (recommended)

Use a selector service that chooses implementation by type/key.

```csharp
public interface INotificationSelector
{
    INotificationSender Get(string channel);
}

public class NotificationSelector : INotificationSelector
{
    private readonly IEnumerable<INotificationSender> _senders;

    public NotificationSelector(IEnumerable<INotificationSender> senders)
    {
        _senders = senders;
    }

    public INotificationSender Get(string channel)
    {
        return channel switch
        {
            "email" => _senders.First(s => s is EmailSender),
            "sms" => _senders.First(s => s is SmsSender),
            _ => throw new InvalidOperationException("Unknown channel")
        };
    }
}
```

### Option 2: Keyed services (in modern .NET)

If your target .NET version supports keyed services, use keys to avoid manual type checks.

## Lifetime Consistency

When implementations serve the same contract, keep lifetime consistent unless there is a strong reason not to.

Mixed lifetimes for the same interface can cause confusion and hard-to-debug behavior.

## Common Mistakes

- Injecting single interface and expecting all implementations.
- Depending on registration order without documenting it.
- Mixing scoped/transient/singleton implementations for same contract without a clear design.

## Rule of Thumb

- Need all implementations: inject IEnumerable<T>.
- Need one by rule: use selector/factory or keyed services.
- Need predictability: keep lifetime and registration intent explicit.

## Real-World Analogy

Think of one support desk with multiple specialists (email, phone, chat).

If you ask for the full team, you get everyone.
If you ask for one specialist, you need a clear routing rule to pick the right person.
