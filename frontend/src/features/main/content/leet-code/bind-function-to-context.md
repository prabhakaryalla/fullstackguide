# 2754. Bind Function to Context

**Difficulty:** Medium
**Category:** Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Implement `myBind(fn)`, which returns a function that, given a `context` object and zero or more bound arguments, produces a new function. Calling that new function with additional arguments invokes the original `fn` with `this` set to `context`, and with the bound arguments followed by the newly supplied arguments — mirroring `Function.prototype.bind`.

### Example
```
function fn(a, b) { return this.name + a + b; }
const bound = myBind(fn)({ name: "A" }, 1);
bound(2); // "A12"
```

## Approach
Adapted to C#, which has no dynamic `this`: the context is modeled as an explicit first parameter that `fn` accepts. Closures capture the context and any pre-bound arguments; the returned delegate concatenates the bound arguments with the call-time arguments before invoking `fn`.

## C# Solution

```csharp
public class Solution
{
    public static Func<object, object[], Func<object[], object>> MyBind(Func<object, object[], object> fn)
    {
        return (context, boundArgs) => callArgs =>
        {
            var allArgs = boundArgs.Concat(callArgs).ToArray();
            return fn(context, allArgs);
        };
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of arguments.
- **Space:** O(n).
