# 2636. Promise Pool

**Difficulty:** Medium
**Category:** Concurrency
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an array of argument-less asynchronous functions and a concurrency limit `n`, implement `promisePool(functions, n)` that executes the functions with **at most `n` running at any given time**. The overall operation completes once every function has finished; if any function fails, the overall operation should fail as soon as that happens.

## Approach
Adapted to C#: use a `SemaphoreSlim` initialized with `n` permits to cap concurrency. For each function, first acquire a permit (awaiting if the pool is already full), then kick off its execution as a background task that releases its permit in a `finally` block once done. Collect all the spawned tasks and `await Task.WhenAll` on them so the method completes only once every function has finished (and propagates the first exception, if any, matching "fail fast" semantics).

## C# Solution

```csharp
public class Solution
{
    public async Task PromisePool(Func<Task>[] functions, int poolLimit)
    {
        using var semaphore = new SemaphoreSlim(poolLimit);
        var tasks = new List<Task>();

        foreach (var fn in functions)
        {
            await semaphore.WaitAsync();

            var task = Task.Run(async () =>
            {
                try
                {
                    await fn();
                }
                finally
                {
                    semaphore.Release();
                }
            });

            tasks.Add(task);
        }

        await Task.WhenAll(tasks);
    }
}
```

## Complexity

- **Time:** Bounded by the total execution time of all functions divided across at most `min(n, functions.Length)` concurrent slots.
- **Space:** O(m), where `m` is the number of functions, for tracking their tasks.
