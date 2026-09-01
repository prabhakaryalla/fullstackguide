# Async Void vs Async Task in C#

Both use async and await, but they behave very differently.

## Quick Rule

- Use async Task (or Task<T>) for almost all async methods.
- Use async void only for event handlers.

## Why async Task Is Preferred

An async Task method:

- Can be awaited by the caller.
- Can be composed with Task.WhenAll and Task.WhenAny.
- Propagates exceptions through the returned Task.
- Is easier to test in unit tests.

```csharp
public async Task SaveAsync(Order order)
{
    await _repository.SaveAsync(order);
}

public async Task ProcessAsync(Order order)
{
    await SaveAsync(order); // caller can await
}
```

## What Is Different About async void

An async void method:

- Cannot be awaited.
- Cannot be composed as a Task.
- Exceptions are raised on the synchronization context, not captured in a returned Task.
- Is harder to test and trace.

```csharp
public async void SaveAsync(Order order)
{
    await _repository.SaveAsync(order);
}
```

If this throws, the caller cannot catch it with normal await flow.

## Exception Behavior Comparison

### async Task

```csharp
public async Task DoWorkAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("Task failure");
}

try
{
    await DoWorkAsync();
}
catch (InvalidOperationException)
{
    Console.WriteLine("Handled");
}
```

### async void

```csharp
public async void DoWork()
{
    await Task.Delay(10);
    throw new InvalidOperationException("Void failure");
}

DoWork(); // cannot await, cannot catch here with await pattern
```

## Correct Use Case for async void

Event handlers in UI frameworks require void return type.

```csharp
private async void SaveButton_Click(object sender, EventArgs e)
{
    try
    {
        await SaveAsync(CurrentOrder);
        StatusMessage = "Saved";
    }
    catch (Exception ex)
    {
        StatusMessage = ex.Message;
    }
}
```

This is the normal and accepted async void use case.

## Testing Impact

- async Task methods are straightforward to test: await and assert.
- async void methods are difficult to test reliably because test frameworks cannot await completion directly.

## Common Mistakes

- Writing service-layer methods as async void.
- Fire-and-forget async void without error handling.
- Mixing sync waits (.Result/.Wait()) with async flows.

## Real-World Analogy

async Task is like getting a tracking ID for a delivery. You can wait for it, combine many deliveries, and detect failure.

async void is like sending something with no tracking ID. You cannot reliably know when it finishes or if it failed.
