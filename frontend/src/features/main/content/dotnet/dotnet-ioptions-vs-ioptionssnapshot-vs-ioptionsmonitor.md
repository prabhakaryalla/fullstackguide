# IOptions vs IOptionsSnapshot vs IOptionsMonitor in .NET

All three are used to access configuration options in .NET, but they differ in lifetime and refresh behavior.

## Quick Difference

- IOptions<T>: singleton-style read of options, no live reload awareness for consumers.
- IOptionsSnapshot<T>: scoped snapshot, refreshed per request in web apps.
- IOptionsMonitor<T>: singleton service with change notifications and current value updates.

## Side-by-Side Comparison

| Type | Lifetime Behavior | Reload Support | Common Use |
|:---|:---|:---|:---|
| IOptions<T> | Single value for app lifetime consumer view | No active push updates to existing value reads | Simple static config |
| IOptionsSnapshot<T> | New value per scope/request | Yes, next request gets updated value | Request-scoped services/controllers |
| IOptionsMonitor<T> | Singleton with latest value access | Yes, supports OnChange callback | Background services, singleton dependencies |

## Sample Options Class

```csharp
public class EmailSettings
{
    public string SmtpHost { get; set; } = string.Empty;
    public int Port { get; set; }
}
```

## Registration

```csharp
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));
```

## IOptions<T> Example

```csharp
public class MailService
{
    private readonly EmailSettings _settings;

    public MailService(IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }
}
```

Use when settings are unlikely to change during runtime, or you only need startup-loaded values.

## IOptionsSnapshot<T> Example

```csharp
public class EmailController : ControllerBase
{
    private readonly IOptionsSnapshot<EmailSettings> _snapshot;

    public EmailController(IOptionsSnapshot<EmailSettings> snapshot)
    {
        _snapshot = snapshot;
    }

    [HttpGet("settings")]
    public IActionResult Get() => Ok(_snapshot.Value);
}
```

In ASP.NET Core, each request gets a fresh snapshot.

## IOptionsMonitor<T> Example

```csharp
public class EmailWorker : BackgroundService
{
    private readonly IOptionsMonitor<EmailSettings> _monitor;
    private EmailSettings _current;

    public EmailWorker(IOptionsMonitor<EmailSettings> monitor)
    {
        _monitor = monitor;
        _current = _monitor.CurrentValue;

        _monitor.OnChange(updated =>
        {
            _current = updated;
        });
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            // Uses most recent _current settings.
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

Use for singleton/background services that must react to config changes while app is running.

## Common Pitfall

Injecting IOptionsSnapshot<T> into singleton services is invalid because snapshot is scoped.

For singleton consumers, use IOptionsMonitor<T>.

## Rule of Thumb

- Request-scoped API logic: IOptionsSnapshot<T>
- Singleton/background services: IOptionsMonitor<T>
- Basic static settings: IOptions<T>

## Real-World Analogy

- IOptions<T> is a printed policy handbook from morning.
- IOptionsSnapshot<T> is a fresh handbook for each shift.
- IOptionsMonitor<T> is a live dashboard that updates immediately when policy changes.
