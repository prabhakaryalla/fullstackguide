# 2627. Debounce

**Difficulty:** Medium
**Category:** Closures

## Problem
Implement a `debounce(fn, t)` utility that returns a "debounced" version of `fn`. Calling the debounced function schedules `fn` to run after `t` milliseconds; if the debounced function is called again before that delay elapses, the previous pending invocation is cancelled and a new delay begins, so `fn` only actually executes once activity has quieted down for a full `t` milliseconds.

## Approach
Adapted to C#: each call cancels any previously scheduled invocation via a `CancellationTokenSource`, then starts a new delayed task. If the delay completes without being cancelled, the wrapped action runs with the latest arguments; if a newer call arrives first, the pending `Task.Delay` throws `TaskCanceledException`, which is swallowed since it simply means this call was superseded.

## C# Solution

```csharp
public class Debouncer
{
    public static Action<T[]> Debounce<T>(Action<T[]> fn, int delayMs)
    {
        CancellationTokenSource cts = null;
        object gate = new object();

        return args =>
        {
            lock (gate)
            {
                cts?.Cancel();
                cts = new CancellationTokenSource();
                var token = cts.Token;

                _ = Task.Run(async () =>
                {
                    try
                    {
                        await Task.Delay(delayMs, token);
                        fn(args);
                    }
                    catch (TaskCanceledException)
                    {
                        // Superseded by a newer call; intentionally ignored.
                    }
                }, token);
            }
        };
    }
}
```

## Complexity

- **Time:** O(1) to schedule each call (excluding the delay itself).
- **Space:** O(1) — only the most recent pending timer is retained at any time.
