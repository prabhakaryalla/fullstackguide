# 1114. Print in Order

**Difficulty:** Easy
**Category:** Concurrency

## Problem

The same `Foo` instance is passed to three different threads, which call `First()`, `Second()`, and `Third()` respectively, but the order in which the threads are scheduled is unpredictable. Design a mechanism so that, regardless of thread scheduling, `Second()` always executes after `First()`, and `Third()` always executes after `Second()`.

### Example

```
Input: threads calling First(), Second(), Third() in arbitrary order
Output: "firstsecondthird" (always printed in this order)
```

## Approach

Use two semaphores as one-shot signals. `First()` runs immediately and then releases a "second is ready" signal. `Second()` blocks on that signal before running, then releases a "third is ready" signal. `Third()` blocks on that signal before running. This chains the three methods regardless of which thread happens to invoke each one.

## C# Solution

```csharp
public class Foo
{
    private readonly SemaphoreSlim secondReady = new(0);
    private readonly SemaphoreSlim thirdReady = new(0);

    public void First(Action printFirst)
    {
        printFirst();
        secondReady.Release();
    }

    public void Second(Action printSecond)
    {
        secondReady.Wait();
        printSecond();
        thirdReady.Release();
    }

    public void Third(Action printThird)
    {
        thirdReady.Wait();
        printThird();
    }
}
```

## Complexity

- **Time:** `O(1)` synchronization overhead per call.
- **Space:** `O(1)` for the two semaphores.
