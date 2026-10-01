# Multicast Delegate Return Value

A delegate can have multiple subscribers, but calling it only gives you back **one** return value — and if any subscriber throws, every subscriber after it in line never runs at all.

## The Question

```csharp
Func<int> handler = () => 1;
handler += () => 2;
handler += () => 3;

int result = handler(); // Output?
```

**Output:** `3`

Not `1`, not `6`, not a list of all three — just `3`.

## Why This Happens

- `+=` on a delegate builds a **multicast delegate** — internally, an ordered invocation list of all three lambdas.
- Invoking `handler()` calls every subscriber in the list, in order — but the *return value* of the whole call is simply whatever the **last** subscriber in the list returned. The results from every earlier subscriber are computed, then silently discarded.
- This is rarely a problem for `Action`/`void`-returning delegates (most event handlers), which is exactly why multicast delegates are so common for events — but it's a real trap the moment you multicast a delegate type that returns a value.

## The Exception Trap

```csharp
Action pipeline = () => Console.WriteLine("Step 1");
pipeline += () => throw new InvalidOperationException("Step 2 failed");
pipeline += () => Console.WriteLine("Step 3");

pipeline(); // Output?
```

**Output:**

```
Step 1
```

...then the `InvalidOperationException` propagates out of the call, and **"Step 3" never prints.**

- Invoking a multicast delegate calls each subscriber in sequence, synchronously, one after another. If one subscriber throws, the exception propagates immediately out of the whole call — the remaining subscribers in the invocation list are simply never reached.
- This is different from something like `Task.WhenAll`, which waits for and reports on every task regardless of individual failures. A multicast delegate has no such "collect all outcomes" behavior built in.

## Getting Every Result (Not Just the Last One)

```csharp
Func<int> handler = () => 1;
handler += () => 2;
handler += () => 3;

foreach (Func<int> single in handler.GetInvocationList())
{
    Console.WriteLine(single()); // prints 1, then 2, then 3 - and isolates failures per-subscriber if wrapped in try/catch
}
```

`Delegate.GetInvocationList()` exposes each subscriber individually, letting you call them one at a time, collect every return value, and isolate failures with your own `try`/`catch` per subscriber if needed.

## Common Mistake

Assuming a multicast delegate that returns a value somehow aggregates or combines the results from every subscriber. It doesn't — only the last subscriber's return value is ever visible from a plain invocation, which is exactly why value-returning delegate types are rarely multicast in real designs (events are almost always `void`-returning for this reason).

## Summary

Invoking a multicast delegate runs every subscriber in order, but only the last subscriber's return value survives the call — earlier results are silently discarded, and a thrown exception stops the remaining subscribers from running at all. Use `GetInvocationList()` if you need every subscriber's result or need to isolate failures between them.
