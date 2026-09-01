# 2715. Timeout Cancellation

**Difficulty:** Easy
**Category:** Function, Concurrency

## Problem

Given a function `fn`, an array of arguments `args`, and a timeout `t` in milliseconds, return a new cancel function. After a delay of `t` milliseconds, `fn` should be invoked with `args` as its arguments — unless the cancel function was called before that delay elapsed, in which case `fn` must never be invoked.

### Example

```
const result = [];
const fn = (x) => result.push(x);
const cancelFn = cancellable(fn, [5], 50);

setTimeout(cancelFn, 40); // cancels before the 50ms delay fires
// fn is never called; result stays []
```

## Approach

JavaScript's `setTimeout`/`clearTimeout` maps naturally to .NET's `System.Threading.Timer` combined with a `CancellationTokenSource`. Schedule the delayed invocation on a timer; the returned cancel action signals the token and disposes the timer so that if it fires afterward (or is still pending), `fn` is skipped.

## C# Solution

```csharp
using System.Threading;

public class Solution
{
    public static Action Cancellable(Action<object[]> fn, object[] args, int t)
    {
        var cts = new CancellationTokenSource();
        Timer timer = null;

        timer = new Timer(_ =>
        {
            if (!cts.IsCancellationRequested)
            {
                fn(args);
            }
            timer.Dispose();
        }, null, t, Timeout.Infinite);

        return () =>
        {
            cts.Cancel();
            timer.Dispose();
        };
    }
}
```

## Complexity

- **Time:** O(1) to schedule or cancel, excluding the cost of `fn` itself.
- **Space:** O(1).
