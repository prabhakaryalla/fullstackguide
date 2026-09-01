# Differences Between Singleton, Scoped, and Transient Lifetimes in Dependency Injection

In .NET dependency injection, lifetime decides how long a service instance lives.

## Quick Meaning

- Singleton: one instance for the whole application lifetime
- Scoped: one instance per request/scope
- Transient: a new instance every time it is requested

## Simple Comparison

| Lifetime | Created When | Reused Until | Typical Use |
|:---|:---|:---|:---|
| Singleton | First time needed | App stops | Shared stateless services, caches |
| Scoped | First use in a request/scope | Request/scope ends | Business services with request context |
| Transient | Every resolve/injection | Immediately after use | Lightweight helper services |

## Registration Example

```csharp
builder.Services.AddSingleton<IAppClock, AppClock>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddTransient<IEmailFormatter, EmailFormatter>();
```

## Behavior Example

```csharp
public class DemoConsumer
{
    public DemoConsumer(
        IAppClock singleton1,
        IAppClock singleton2,
        IOrderService scoped1,
        IOrderService scoped2,
        IEmailFormatter transient1,
        IEmailFormatter transient2)
    {
        // singleton1 and singleton2 -> same instance across app
        // scoped1 and scoped2 -> same instance inside current request
        // transient1 and transient2 -> different instances
    }
}
```

## When to Use Which

Use Singleton when:

- Service is stateless or thread-safe shared state
- You want one global instance

Use Scoped when:

- Service should be consistent during one request
- It depends on scoped resources such as DbContext

Use Transient when:

- Service is lightweight
- New instance per use is acceptable

## Important Rule

Do not inject scoped services directly into singleton services.

Reason:

- Singleton lives for app lifetime
- Scoped service lives only per request
- Lifetime mismatch can cause runtime errors or stale behavior

## Real-World Analogy

- Singleton is like one company-wide reception desk.
- Scoped is like one support agent assigned per customer session.
- Transient is like a disposable note pad used for one small task and replaced immediately.
