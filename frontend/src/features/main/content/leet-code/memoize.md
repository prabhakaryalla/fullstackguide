# 2623. Memoize

**Difficulty:** Medium
**Category:** Closures, Hash Table

## Problem
Implement a `memoize` utility that wraps a pure function so repeated calls with the same arguments return the cached result instead of recomputing it, while calls with new argument combinations invoke the original function and cache the outcome for next time.

## Approach
Adapted to C#: build a generic `Memoize` helper that wraps a two-argument `Func<T1, T2, TResult>` delegate. A `Dictionary` keyed on the tuple of arguments stores previously computed results; on each call, the cache is checked first, and the underlying function is only invoked (and its result stored) on a cache miss.

## C# Solution

```csharp
public static class Memoizer
{
    public static Func<T1, T2, TResult> Memoize<T1, T2, TResult>(Func<T1, T2, TResult> fn)
    {
        var cache = new Dictionary<(T1, T2), TResult>();

        return (a, b) =>
        {
            var key = (a, b);
            if (!cache.TryGetValue(key, out var result))
            {
                result = fn(a, b);
                cache[key] = result;
            }

            return result;
        };
    }
}
```

## Complexity

- **Time:** O(1) amortized per call (excluding the cost of the first computation for each unique argument pair).
- **Space:** O(k), where `k` is the number of distinct argument pairs seen.
