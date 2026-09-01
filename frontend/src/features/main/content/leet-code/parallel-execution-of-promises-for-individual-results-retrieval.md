# 2795. Parallel Execution of Promises for Individual Results Retrieval

**Difficulty:** Medium
**Category:** Closure, Concurrency
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an array of functions, each returning a promise, implement a function that runs them all concurrently and resolves to an array of result descriptors — one per input function, in the original order — where each descriptor reports whether that function's promise fulfilled (with its value) or rejected (with its reason). This mirrors `Promise.allSettled`.

## Approach
Adapted to C# using `Task<T>` and a small `SettledResult<T>` type. Start every function concurrently, `await` each individually inside a `try`/`catch` so one failure doesn't cancel the others, and gather all the settled results with `Task.WhenAll`.

## C# Solution

```csharp
public class Solution
{
    public class SettledResult<T>
    {
        public bool Success { get; init; }
        public T Value { get; init; }
        public Exception Error { get; init; }
    }

    public static async Task<List<SettledResult<T>>> PromiseAllSettled<T>(List<Func<Task<T>>> functions)
    {
        var tasks = functions.Select(async fn =>
        {
            try
            {
                var value = await fn();
                return new SettledResult<T> { Success = true, Value = value };
            }
            catch (Exception ex)
            {
                return new SettledResult<T> { Success = false, Error = ex };
            }
        });

        return (await Task.WhenAll(tasks)).ToList();
    }
}
```

## Complexity

- **Time:** O(1) extra beyond running the tasks concurrently.
- **Space:** O(n).
