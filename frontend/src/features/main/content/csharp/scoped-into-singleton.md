# Can You Inject a Scoped Service into a Singleton? Why or Why Not?

Short answer: directly injecting a scoped service into a singleton is not valid in normal .NET DI usage.

## Why This Is a Problem

Lifetimes are different:

- Singleton lives for the whole app lifetime.
- Scoped lives only for one request/scope.

If a singleton holds a scoped dependency, that scoped instance can outlive its scope and behave incorrectly.

## Typical Runtime Error

In many setups, the container throws an error similar to:

Cannot consume scoped service from singleton.

This protects you from lifetime mismatch bugs.

## Invalid Example

```csharp
public interface IRequestContext
{
    string CorrelationId { get; }
}

public class RequestContext : IRequestContext
{
    public string CorrelationId { get; } = Guid.NewGuid().ToString();
}

public class GlobalReporter // registered as singleton
{
    private readonly IRequestContext _context; // scoped

    public GlobalReporter(IRequestContext context)
    {
        _context = context;
    }
}
```

Here GlobalReporter is singleton, but IRequestContext is scoped. This is a lifetime mismatch.

## Safe Alternatives

### 1. Change consumer lifetime to scoped

If the service really needs scoped data, make the consumer scoped too.

### 2. Resolve scoped dependency inside a scope

Use IServiceScopeFactory in singleton to create a scope only when needed.

```csharp
public class GlobalReporter
{
    private readonly IServiceScopeFactory _scopeFactory;

    public GlobalReporter(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public void Report()
    {
        using var scope = _scopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<IRequestContext>();

        Console.WriteLine(context.CorrelationId);
    }
}
```

### 3. Pass scoped values as method parameters

Instead of storing scoped service in singleton, pass request-specific values from scoped caller.

## Rule of Thumb

- Singleton should depend on singleton or stateless/transient-safe dependencies.
- Scoped services should stay inside request or explicit scope boundaries.

## Real-World Analogy

A singleton is like a company-wide policy engine that stays all year.

A scoped service is like a visitor badge valid for one visit.

You cannot permanently pin one visitor badge to the policy engine and expect it to remain valid forever.
