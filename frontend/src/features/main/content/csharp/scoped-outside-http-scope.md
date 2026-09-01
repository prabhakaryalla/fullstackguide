# Resolve a Scoped Service Outside of an HTTP Request Scope: What Happens?

A scoped service is designed to live inside a scope, usually one HTTP request in ASP.NET Core.

If you try to resolve it outside a scope, behavior depends on how you resolve it.

## Case 1: Resolve from Root Provider

If you resolve a scoped service directly from the root provider:

```csharp
var service = app.Services.GetRequiredService<IMyScopedService>();
```

You typically get an error (especially when scope validation is enabled):

Cannot resolve scoped service from root provider.

Why:

- Root provider has application lifetime.
- Scoped services need a bounded lifetime scope.

## Case 2: Create a Manual Scope (Correct)

You can resolve scoped services safely outside HTTP requests by creating a scope explicitly.

```csharp
using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider.GetRequiredService<IMyScopedService>();
service.Run();
```

This is the correct pattern for:

- Startup tasks
- Background jobs
- Console workers

## BackgroundService Pattern

```csharp
public class ReportWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public ReportWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();
            var svc = scope.ServiceProvider.GetRequiredService<IMyScopedService>();
            await svc.RunAsync(stoppingToken);

            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

Each loop iteration gets a fresh scoped instance with proper disposal boundaries.

## Why It Matters

Resolving scoped services from root can cause:

- Lifetime mismatch bugs
- Improper disposal behavior
- Hidden memory/resource leaks

## Rule of Thumb

- Inside controller/minimal API request: DI scope already exists.
- Outside request: always create a scope before resolving scoped services.
- Never cache a scoped instance in singleton fields.

## Real-World Analogy

A scoped service is like a visitor pass valid for one visit.

Outside that visit, the pass is invalid. You must issue a new pass (new scope) each time.
