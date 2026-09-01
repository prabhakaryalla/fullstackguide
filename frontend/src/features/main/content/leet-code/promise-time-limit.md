# 2637. Promise Time Limit

**Difficulty:** Medium
**Category:** Concurrency

## Problem
Given an asynchronous function `fn` and a time limit `t` (in milliseconds), implement `timeLimit(fn, t)` that returns a new function with the same behavior as `fn`, except that if `fn` has not completed within `t` milliseconds, the returned function fails with a "Time Limit Exceeded" error instead of waiting indefinitely.

## Approach
Adapted to C#: race the invocation of `fn` against a `Task.Delay(t)` using `Task.WhenAny`. If the delay task finishes first, throw a `TimeoutException`; otherwise, await and return the original task's result, which by that point is guaranteed to already be complete.

## C# Solution

```csharp
public class Solution
{
    public async Task<T> TimeLimit<T>(Func<Task<T>> fn, int t)
    {
        var fnTask = fn();
        var delayTask = Task.Delay(t);

        var completed = await Task.WhenAny(fnTask, delayTask);

        if (completed == delayTask)
        {
            throw new TimeoutException("Time Limit Exceeded");
        }

        return await fnTask;
    }
}
```

## Complexity

- **Time:** O(1) of overhead beyond `fn`'s own execution time.
- **Space:** O(1).
