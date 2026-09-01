# 2756. Query Batching

**Difficulty:** Medium
**Category:** Closure, Concurrency
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an asynchronous function `query(key)` that resolves with data for `key`, implement `getQueryHandler(query)` returning a batched `requestManager(key)`. If `requestManager` is called with the same `key` while a request for that key is still pending, all callers should share the single underlying `query(key)` call instead of issuing duplicate calls. Once that pending call settles, a subsequent call with the same key triggers a fresh underlying request.

## Approach
Adapted to C# using a dictionary that maps a key to its in-flight `Task<string>`. A call with a key that already has a pending task returns the cached task; a call with a new key starts a new task and caches it, removing the cache entry once the task completes so future calls trigger a fresh request.

## C# Solution

```csharp
public class Solution
{
    public static Func<string, Task<string>> GetQueryHandler(Func<string, Task<string>> query)
    {
        var pending = new Dictionary<string, Task<string>>();

        Task<string> RequestManager(string key)
        {
            if (pending.TryGetValue(key, out var existing))
            {
                return existing;
            }

            var task = query(key);
            pending[key] = task;
            task.ContinueWith(_ => pending.Remove(key));

            return task;
        }

        return RequestManager;
    }
}
```

## Complexity

- **Time:** O(1) amortized per call.
- **Space:** O(number of distinct in-flight keys).
