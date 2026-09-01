# 2725. Interval Cancellation

**Difficulty:** Medium
**Category:** Concurrency, Closure

## Problem
Given a function `fn`, an array of arguments `args`, and a time interval `t` (in milliseconds), invoke `fn(...args)` immediately, then repeatedly every `t` milliseconds. Return a `cancel` function; once called, no further invocations of `fn` should occur, even if a delay is already in progress.

### Example
```
Input: fn = (x, y) => x + y, args = [3, 5], t = 50
Output: fn(3, 5) is called at time 0, 50, 100, ... until cancel() is invoked.
```

## Approach
Adapted to C# using a `CancellationTokenSource` and a background loop. Call `fn` immediately, then repeatedly `await Task.Delay(t, token)` and call `fn` again; when the delay observes a cancellation request it throws, which stops the loop. The returned `Action` simply requests cancellation.

## C# Solution

```csharp
public class Solution
{
    public static Action IntervalCancellation(Action<object[]> fn, object[] args, int t)
    {
        var cts = new CancellationTokenSource();

        fn(args);

        Task.Run(async () =>
        {
            try
            {
                while (true)
                {
                    await Task.Delay(t, cts.Token);
                    fn(args);
                }
            }
            catch (TaskCanceledException)
            {
                // Cancellation requested; stop repeating.
            }
        });

        return () => cts.Cancel();
    }
}
```

## Complexity

- **Time:** O(1) per invocation of `fn`.
- **Space:** O(1).
