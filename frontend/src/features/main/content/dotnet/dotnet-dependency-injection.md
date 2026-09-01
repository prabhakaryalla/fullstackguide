# .NET Dependency Injection

The .NET built-in dependency injection (DI) container provides IoC support.

## Service Lifetimes

| Lifetime | Description |
|---|---|
| Transient | New instance per request |
| Scoped | One instance per HTTP request |
| Singleton | One instance for the app lifetime |

## Registering Services

```csharp
builder.Services.AddTransient<IMyService, MyService>();
builder.Services.AddScoped<IDbContext, AppDbContext>();
builder.Services.AddSingleton<ICache, MemoryCache>();
```

## Constructor Injection

```csharp
public class OrderController(IOrderService orders)
{
    public IActionResult Get(int id) => Ok(orders.GetById(id));
}
```
