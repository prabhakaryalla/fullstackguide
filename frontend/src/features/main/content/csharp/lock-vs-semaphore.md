# Difference Between lock and Semaphore in C#

Both lock and Semaphore are synchronization mechanisms, but they solve different concurrency problems.

## Quick Difference

- lock allows only one thread at a time into a critical section.
- Semaphore allows a limited number of threads at the same time.

## lock in C#

lock is used for mutual exclusion inside a process.

Example:

```csharp
private readonly object _sync = new();
private int _counter;

public void Increment()
{
    lock (_sync)
    {
        _counter++;
    }
}
```

Key points:

- only one thread enters lock block for that monitor object
- simple and fast for in-memory shared state
- automatically releases on exceptions when block exits

## Semaphore in C#

Semaphore controls concurrent access count instead of strict one-at-a-time.

Example with SemaphoreSlim:

```csharp
private readonly SemaphoreSlim _semaphore = new(initialCount: 3, maxCount: 3);

public async Task ProcessAsync()
{
    await _semaphore.WaitAsync();
    try
    {
        // up to 3 callers can run here concurrently
        await Task.Delay(100);
    }
    finally
    {
        _semaphore.Release();
    }
}
```

Key points:

- allows N concurrent entries
- useful for throttling access to limited resources
- SemaphoreSlim supports async with WaitAsync

## Typical Use Cases

Use lock when:

- protecting shared variables or collections
- exactly one-thread-at-a-time is required
- operation is synchronous and quick

Use Semaphore or SemaphoreSlim when:

- limiting parallel calls (for example max 5 API calls)
- pooling scarce resources
- coordinating async workflows

## Important Behavior Differences

| Aspect | lock | SemaphoreSlim |
| :--- | :--- | :--- |
| Concurrency allowed | 1 thread | Configurable N threads |
| Async support | No await inside lock block | Yes via WaitAsync |
| Scope | In-process thread synchronization | In-process concurrency throttling |
| Error risk | Deadlock if nested/misordered locks | Leaks if Release not called |

## Common Mistakes

- Using lock with async/await. This can cause design issues because await is not allowed in lock block.
- Forgetting to call Release in finally for SemaphoreSlim.
- Using one global semaphore for unrelated operations, creating unnecessary contention.

## Real-World Example

Suppose a service sends notifications:

- Updating local in-memory retry map should use lock.
- Sending outbound requests to provider should use SemaphoreSlim with a cap (for example 10) to avoid rate-limit bursts.

This combination gives both safety and throughput control.

## Summary

Use lock for strict mutual exclusion over shared in-process state. Use Semaphore or SemaphoreSlim when you need controlled parallelism. If async code is involved, SemaphoreSlim is usually the safer and more scalable choice.
