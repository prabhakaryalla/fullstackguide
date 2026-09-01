# 2693. Call Function with Custom Context

**Difficulty:** Easy
**Category:** Function, Closure

## Problem

Given a function `fn`, implement your own version of the built-in `Function.prototype.call()` method as `callPolyfill`. It should accept at least one argument, `obj`, which becomes the value bound to `this` inside `fn`, followed by any additional arguments that are forwarded to `fn` as its own parameters. `callPolyfill` returns whatever `fn` returns.

### Example

```
const fn = function (x, y) {
  return this.a + x + y;
};

callPolyfill(fn, { a: 5 }, 1, 2); // 8
```

## Approach

C# has no implicit `this` rebinding mechanism like JavaScript. The solution is adapted by making the context an explicit first parameter of the delegate instead of an implicit one: `fn` is represented as a `Func<TContext, int[], TResult>` that receives the context object directly, and `CallPolyfill` simply forwards the context and the remaining arguments to it — modeling how `.call()` supplies the binding that would otherwise be `this`.

## C# Solution

```csharp
public class Solution
{
    // Mimics `fn.call(obj, ...args)`: obj supplies the context normally bound to `this`.
    public static TResult CallPolyfill<TContext, TResult>(
        Func<TContext, int[], TResult> fn, TContext obj, params int[] args)
    {
        return fn(obj, args);
    }
}

public class Context
{
    public int A { get; set; }
}

// Usage:
// Func<Context, int[], int> fn = (ctx, args) => ctx.A + args[0] + args[1];
// Solution.CallPolyfill(fn, new Context { A = 5 }, 1, 2); // 8
```

## Complexity

- **Time:** O(k), where k is the number of forwarded arguments.
- **Space:** O(k) for the forwarded arguments array.
