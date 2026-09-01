# 2632. Curry

**Difficulty:** Medium
**Category:** Closures
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Implement `curry(fn)`, which returns a "curried" version of `fn`: instead of requiring all of `fn`'s arguments in a single call, the curried function can be called with any number of arguments at a time, returning a new function awaiting the remaining arguments, until enough arguments have been supplied across all calls — at which point `fn` is finally invoked with the accumulated arguments and its result is returned.

## Approach
Adapted to C#: since C# doesn't support variable-arity currying as naturally as JavaScript, model it around a `Delegate` and its declared parameter count (`fn.Method.GetParameters().Length`). A recursive helper accumulates arguments passed so far in an `object[]`; each call appends the newly supplied arguments to the accumulated list. Once the total count reaches the target arity, `DynamicInvoke` is used to call the underlying delegate with the collected arguments; otherwise, another partially-applied function is returned to continue collecting.

## C# Solution

```csharp
public class Curry
{
    public static Func<object[], object> CurryFn(Delegate fn)
    {
        int arity = fn.Method.GetParameters().Length;
        return Collect(fn, arity, Array.Empty<object>());
    }

    private static Func<object[], object> Collect(Delegate fn, int arity, object[] collected)
    {
        return newArgs =>
        {
            var combined = collected.Concat(newArgs).ToArray();

            if (combined.Length >= arity)
            {
                return fn.DynamicInvoke(combined.Take(arity).ToArray());
            }

            return Collect(fn, arity, combined);
        };
    }
}
```

## Complexity

- **Time:** O(arity) total work across all partial-application calls.
- **Space:** O(arity) to store the accumulated arguments.
