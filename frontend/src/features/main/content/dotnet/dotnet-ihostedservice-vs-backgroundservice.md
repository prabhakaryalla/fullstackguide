# IHostedService vs BackgroundService in .NET Core

Both are used to run background work in .NET applications, but they are used at different abstraction levels.

## Quick Difference

- IHostedService is the low-level contract.
- BackgroundService is a base class that implements most IHostedService plumbing for you.

## Interface vs Base Class

| Area | IHostedService | BackgroundService |
|:---|:---|:---|
| Type | Interface | Abstract base class |
| Methods to implement | StartAsync and StopAsync | ExecuteAsync (main loop) |
| Boilerplate | More | Less |
| Best for | Full lifecycle control | Long-running worker loops |

## IHostedService Example

```csharp
public class WarmupHostedService : IHostedService
{
    private readonly ILogger<WarmupHostedService> _logger;

    public WarmupHostedService(ILogger<WarmupHostedService> logger)
    {
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Warmup started");
        await Task.Delay(500, cancellationToken);
        _logger.LogInformation("Warmup completed");
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Service stopping");
        return Task.CompletedTask;
    }
}
```

Use this when you need explicit startup and shutdown behavior.

## BackgroundService Example

```csharp
public class QueueWorker : BackgroundService
{
    private readonly ILogger<QueueWorker> _logger;

    public QueueWorker(ILogger<QueueWorker> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Polling queue...");
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

Use this for periodic or continuous processing loops.

## Registration in DI

```csharp
builder.Services.AddHostedService<WarmupHostedService>();
builder.Services.AddHostedService<QueueWorker>();
```

## Lifecycle Notes

- Host calls StartAsync when app starts.
- Host calls StopAsync during graceful shutdown.
- In BackgroundService, ExecuteAsync runs until cancellation is requested.

## When to Choose Which

Choose IHostedService when:

- You need custom startup sequence logic.
- You need precise control over start/stop phases.

Choose BackgroundService when:

- You run long-lived loop-based background work.
- You want cleaner code with less lifecycle boilerplate.

## Common Mistakes

- Blocking StartAsync with long-running loops.
- Ignoring cancellation tokens in ExecuteAsync.
- Throwing unhandled exceptions repeatedly without retry/backoff strategy.

## Real-World Analogy

IHostedService is like designing your own full operating manual for opening and closing a store.

BackgroundService is like using a standard store template where opening/closing steps are pre-defined, and you focus only on daily operations.
