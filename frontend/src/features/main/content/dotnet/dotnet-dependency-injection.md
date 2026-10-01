# .NET Dependency Injection

ASP.NET Core's built-in dependency injection (DI) container implements Inversion of Control: instead of a class constructing its own dependencies with `new`, it declares what it needs in its constructor and the container supplies (injects) a matching implementation. This is what makes controllers, services, and middleware testable in isolation and lets you swap implementations (real vs. fake, dev vs. prod) without touching consumer code.

## Short Answer

- Register a service with a **lifetime** (`Transient`, `Scoped`, or `Singleton`) that controls how often a new instance is created.
- Consumers declare dependencies via **constructor injection**; the container resolves the full dependency graph automatically.
- The most common production bug is a **captive dependency** — a longer-lived service (Singleton) holding onto a shorter-lived one (Scoped), silently freezing it for the app's entire lifetime.
- `IServiceScopeFactory`, `Func<T>` factories, and keyed services (.NET 8+) let you resolve dependencies safely when the simple constructor-injection model isn't enough.

## Service Lifetimes

| Lifetime | New instance created | Typical use | Common mistake |
|---|---|---|---|
| **Transient** | Every time it's resolved | Lightweight, stateless services (mappers, validators) | Registering something expensive (e.g. an `HttpClient`) as transient causes repeated setup cost/socket exhaustion |
| **Scoped** | Once per HTTP request (per DI scope) | `DbContext`, unit-of-work, per-request state | Resolving it outside a request (e.g. from a background thread) without creating a scope throws `InvalidOperationException` |
| **Singleton** | Once for the app's entire lifetime | Configuration, caches, connection-pool wrappers | Injecting a **Scoped** service into it — see the captive dependency problem below |

```csharp
builder.Services.AddTransient<IMyService, MyService>();
builder.Services.AddScoped<IDbContext, AppDbContext>();
builder.Services.AddSingleton<ICache, MemoryCache>();
```

## Registering Services

```csharp
// Only registers if no implementation is already registered for the interface —
// useful in libraries/extension methods that shouldn't override a caller's registration.
builder.Services.TryAddScoped<IEmailSender, SmtpEmailSender>();

// .NET 8+: keyed services let you register multiple implementations of the same
// interface and resolve a specific one by key, instead of juggling wrapper types.
builder.Services.AddKeyedSingleton<INotifier, SmsNotifier>("sms");
builder.Services.AddKeyedSingleton<INotifier, EmailNotifier>("email");
```

```csharp
public class AlertService([FromKeyedServices("sms")] INotifier notifier)
{
    public Task AlertAsync(string message) => notifier.SendAsync(message);
}
```

## Constructor Injection

```csharp
public class OrderController(IOrderService orders)
{
    public IActionResult Get(int id) => Ok(orders.GetById(id));
}
```

- The container builds the entire dependency graph recursively — if `IOrderService` itself depends on `IPaymentGateway`, the container resolves that too, without the controller knowing or caring.
- If multiple implementations are registered for the same interface (without keys), constructor injection resolves the **last one registered**; inject `IEnumerable<T>` to get all of them (e.g. running every registered `IHealthCheck`).

## The Captive Dependency Problem

The single most common DI bug in production ASP.NET Core apps: injecting a **Scoped** service into a **Singleton**.

```archify
diagrams/dotnet-di-captive-dependency-sequence.html
```

```csharp
// ❌ CacheService is Singleton, AppDbContext is Scoped
builder.Services.AddSingleton<CacheService>();
builder.Services.AddScoped<AppDbContext>();

public class CacheService(AppDbContext db) // db is resolved ONCE, at app startup
{
    public Task<Data> GetDataAsync() => db.Data.FirstAsync(); // every request reuses this same DbContext
}
```

Why it's dangerous: a Singleton's constructor dependencies are resolved exactly once, the first time the container builds it — not per request. The `AppDbContext` instance captured there is then shared across **every concurrent request** for the app's entire lifetime. EF Core's `DbContext` is not thread-safe, so two requests hitting it at the same time throw `InvalidOperationException: A second operation was started on this context before a previous operation completed`, or silently corrupt tracked-entity state.

**How to catch it early:** in `Development`, set `options.ValidateScopes = true` (the default for the WebApplication builder) — the container throws at startup/first-resolve instead of failing intermittently under concurrent load in production.

**The fix** — never inject Scoped directly into Singleton; instead inject a scope factory and create a fresh scope (and thus a fresh `DbContext`) each time you need one:

```csharp
public class CacheService(IServiceScopeFactory scopeFactory)
{
    public async Task<Data> GetDataAsync()
    {
        using var scope = scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        return await db.Data.FirstAsync();
    }
}
```

## Resolving Dependencies at Runtime

Constructor injection covers most cases, but sometimes you need to resolve something conditionally or lazily:

```csharp
// Func<T> factory - defers creation until actually invoked
public class ReportGenerator(Func<IPdfRenderer> rendererFactory)
{
    public byte[] Generate() => rendererFactory().Render();
}

// IServiceProvider - resolve by type dynamically (use sparingly; it hides real dependencies)
public class PluginLoader(IServiceProvider provider)
{
    public T Resolve<T>() where T : notnull => provider.GetRequiredService<T>();
}
```

Prefer explicit constructor injection wherever possible — reaching for `IServiceProvider` as a general-purpose "service locator" makes a class's real dependencies invisible from its constructor signature and harder to unit test.

## Disposal

- **Scoped** and **Transient** `IDisposable`/`IAsyncDisposable` services are disposed automatically when their owning scope ends (end of the HTTP request).
- **Singleton** disposables are disposed when the app shuts down.
- The container — not the consumer — owns disposal; don't manually `Dispose()` an injected dependency, since other consumers in the same scope may still be using it.

## Interview Answer

ASP.NET Core's DI container resolves constructor dependencies based on a registered lifetime — Transient (new every time), Scoped (once per request), or Singleton (once per app). The classic production bug is a captive dependency: injecting a Scoped service like a DbContext directly into a Singleton, which freezes that instance for the app's whole lifetime and causes thread-safety errors under concurrent load. The fix is to inject `IServiceScopeFactory` into the Singleton and create a new scope each time it needs the Scoped dependency, rather than capturing it at construction.

## Summary

.NET's DI container automates constructing and wiring dependency graphs based on declared lifetimes. Transient and Scoped are safe defaults for most services; Singleton is for genuinely app-wide state. The lifetime mismatch to watch for is a Singleton capturing a Scoped dependency — always route that access through `IServiceScopeFactory` instead of direct constructor injection, and enable `ValidateScopes` in Development so the container catches the mistake at startup rather than in production under load.

