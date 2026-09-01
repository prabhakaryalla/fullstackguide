# What Happens If an Exception Is Thrown Inside Parallel.For?

When an exception happens inside Parallel.For, .NET captures exceptions from worker iterations and rethrows them as an AggregateException when the loop completes or aborts.

## Key Behavior

- One or more iterations can fail.
- Parallel.For may stop scheduling more iterations after failure is detected.
- Already-running iterations can still finish.
- Caller receives AggregateException.

## Basic Example

```csharp
try
{
    Parallel.For(0, 10, i =>
    {
        if (i == 3)
            throw new InvalidOperationException("Failure at i=3");

        Console.WriteLine($"Processed {i}");
    });
}
catch (AggregateException ex)
{
    foreach (var inner in ex.InnerExceptions)
    {
        Console.WriteLine(inner.Message);
    }
}
```

You usually catch AggregateException, then inspect InnerExceptions.

## Why AggregateException?

Parallel work can fail in multiple iterations at the same time. A single exception object cannot represent all failures, so .NET wraps them together.

## Common Handling Patterns

### 1. Catch outside and inspect inner exceptions

```csharp
try
{
    Parallel.ForEach(items, item => Process(item));
}
catch (AggregateException ex)
{
    var known = ex.InnerExceptions.OfType<InvalidOperationException>().ToList();
    var unknown = ex.InnerExceptions.Except(known).ToList();

    // handle known issues
    foreach (var k in known)
        Log(k.Message);

    // rethrow unknown problems
    if (unknown.Count > 0)
        throw new AggregateException(unknown);
}
```

### 2. Use local try/catch when you want loop to continue

```csharp
ConcurrentBag<string> errors = new ConcurrentBag<string>();

Parallel.ForEach(items, item =>
{
    try
    {
        Process(item);
    }
    catch (Exception ex)
    {
        errors.Add($"Item {item}: {ex.Message}");
    }
});

if (!errors.IsEmpty)
{
    foreach (var e in errors) Console.WriteLine(e);
}
```

This pattern converts fail-fast behavior into collect-and-continue behavior.

## Stop vs Break vs Exception

- Exception: indicates failure; propagated as AggregateException.
- Break: stop iterations above a boundary in ordered loops.
- Stop: request global early stop as soon as possible.

Use exceptions for errors, not for normal control flow.

## Practical Guidance

- CPU-bound independent work: Parallel.For is suitable.
- If each item can fail independently and you want full reporting, catch inside each iteration and aggregate errors yourself.
- Keep iteration bodies small and thread-safe.

## Real-World Analogy

Imagine many quality inspectors checking products at the same time.

If several inspectors find defects, the supervisor receives a single report that contains all defect details.

AggregateException is that combined report.
