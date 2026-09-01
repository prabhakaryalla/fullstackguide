# 2797. Partial Function with Placeholders

**Difficulty:** Medium
**Category:** Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a function `fn` and an array `args` that may contain a special placeholder value, implement `partial(fn, args)`, returning a new function. When the returned function is called with additional arguments, each placeholder in `args` is replaced, in order, with the next supplied argument; any supplied arguments left over after filling all placeholders are appended at the end before calling `fn`.

### Example
```
Input: partial((a, b, c) => a + b + c, [1, PLACEHOLDER, 3])(2)
Output: fn(1, 2, 3)
```

## Approach
Adapted to C# using a dedicated `Placeholder` sentinel object and closures. The returned delegate captures `fn` and `args`; when invoked, it walks `args`, substituting each placeholder with the next value from the call-time argument list, then appends any remaining call-time arguments before invoking `fn`.

## C# Solution

```csharp
public sealed class Placeholder
{
    public static readonly Placeholder Instance = new Placeholder();
    private Placeholder() { }
}

public class Solution
{
    public static Func<object[], object> Partial(Func<object[], object> fn, object[] args)
    {
        return newArgs =>
        {
            var result = new object[args.Length];
            int newIndex = 0;

            for (int i = 0; i < args.Length; i++)
            {
                result[i] = ReferenceEquals(args[i], Placeholder.Instance)
                    ? newArgs[newIndex++]
                    : args[i];
            }

            var combined = result.Concat(newArgs.Skip(newIndex)).ToArray();
            return fn(combined);
        };
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of arguments.
- **Space:** O(n).
