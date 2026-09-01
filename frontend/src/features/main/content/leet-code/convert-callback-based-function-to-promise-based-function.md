# 2776. Convert Callback Based Function to Promise Based Function

**Difficulty:** Medium
**Category:** Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a function `fn` that accepts some leading arguments followed by a callback of the form `callback(error, result)`, implement `promisify(fn)`, which returns a new function that, when called with the same leading arguments, returns a Promise that resolves with `result` or rejects with `error`, instead of relying on a callback.

## Approach
Adapted to C# using `TaskCompletionSource<object>`. The returned function invokes `fn` with a callback that sets the completion source's result or exception depending on whether an error was reported, and returns the completion source's `Task`.

## C# Solution

```csharp
public class Solution
{
    public static Func<object[], Task<object>> Promisify(Action<object[], Action<Exception, object>> fn)
    {
        return args =>
        {
            var tcs = new TaskCompletionSource<object>();

            fn(args, (err, result) =>
            {
                if (err != null)
                {
                    tcs.SetException(err);
                }
                else
                {
                    tcs.SetResult(result);
                }
            });

            return tcs.Task;
        };
    }
}
```

## Complexity

- **Time:** O(1) beyond the wrapped call.
- **Space:** O(1).
