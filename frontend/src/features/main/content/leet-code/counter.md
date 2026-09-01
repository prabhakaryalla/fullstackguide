# 2620. Counter

**Difficulty:** Easy
**Category:** Closures

## Problem
Implement a function that, given a starting number `n`, returns a new zero-argument function. Each time the returned function is called, it should return the next value in the sequence `n, n + 1, n + 2, ...`, starting with `n` on the very first call.

## Approach
Adapted to C#: use a closure that captures mutable local state (`current`) inside a `Func<int>`. The first invocation returns the initial value `n` unmodified; every subsequent invocation increments the captured state before returning it.

## C# Solution

```csharp
public class Solution
{
    public Func<int> CreateCounter(int n)
    {
        int current = n;
        bool isFirstCall = true;

        return () =>
        {
            if (isFirstCall)
            {
                isFirstCall = false;
                return current;
            }

            return ++current;
        };
    }
}
```

## Complexity

- **Time:** O(1) per call.
- **Space:** O(1).
