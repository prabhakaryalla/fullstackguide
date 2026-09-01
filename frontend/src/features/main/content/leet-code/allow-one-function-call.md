# 2666. Allow One Function Call

**Difficulty:** Easy
**Category:** Closure, Function

## Problem

Given a function `fn`, return a new function that behaves identically to `fn` except that it guarantees `fn` is invoked at most once:

- The first time the returned function is called, it calls `fn` and returns its result.
- Every subsequent call returns `undefined` (no value) without ever calling `fn` again.

### Example

```
Input: fn = (a, b, c) => a + b + c, calls = [[1, 2, 3]]
Output: [{ calls: 1, value: 6 }]
```

## Approach

The JavaScript version uses a closure over a boolean `called` flag. In C#, we wrap a generic `Func<>` delegate inside another delegate that captures a `called` flag; the wrapper only forwards to the original delegate the first time it's invoked, returning a nullable result on subsequent calls to represent "no value".

## C# Solution

```csharp
public class Solution
{
    public static Func<int, int, int, int?> Once(Func<int, int, int, int> fn)
    {
        bool called = false;

        return (a, b, c) =>
        {
            if (called)
            {
                return null;
            }

            called = true;
            return fn(a, b, c);
        };
    }
}
```

## Complexity

- **Time:** O(1) wrapper overhead, plus the cost of `fn` on the first call only.
- **Space:** O(1).
