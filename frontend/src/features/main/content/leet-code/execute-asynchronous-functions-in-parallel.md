# 2721. Execute Asynchronous Functions in Parallel

**Difficulty:** Medium
**Category:** Concurrency, Function

## Problem

Given an array of asynchronous functions, each of which accepts no arguments and returns a promise, run them all in parallel and produce a single combined promise/task:

- It resolves once every function's promise resolves successfully, yielding an array of their results in the same order as the input functions (not necessarily their completion order).
- It rejects as soon as any function's promise rejects, propagating that rejection reason.

### Example

```
Input: functions = [
  () => new Promise(res => setTimeout(() => res(5), 200)),
  () => new Promise((res, rej) => setTimeout(() => rej("Error"), 100))
]
Output: rejects at t = 100ms with "Error"
```

## Approach

This maps directly onto .NET's `Task.WhenAll`, which starts every task concurrently, preserves the input order in its resulting array, and rethrows the first exception encountered by any of the awaited tasks. Adapted to C#, each JavaScript async function becomes a `Func<Task<int>>`; invoking all of them immediately starts them running concurrently, and `await Task.WhenAll(...)` gathers the ordered results (or surfaces the first failure).

## C# Solution

```csharp
using System.Threading.Tasks;

public class Solution
{
    public static async Task<int[]> PromiseAll(Func<Task<int>>[] functions)
    {
        var tasks = new Task<int>[functions.Length];
        for (int i = 0; i < functions.Length; i++)
        {
            tasks[i] = functions[i]();
        }

        return await Task.WhenAll(tasks);
    }
}
```

## Complexity

- **Time:** Bounded by the slowest function's latency, since all functions run concurrently.
- **Space:** O(n) for storing the tasks and their results.
