# 1115. Print FooBar Alternately

**Difficulty:** Medium
**Category:** Concurrency

## Problem

The same `FooBar` instance is given to two threads: one repeatedly calls `Foo()` and the other repeatedly calls `Bar()`, each `n` times. Design a mechanism so that the combined output is always `"foobar"` repeated `n` times, with `foo` and `bar` strictly alternating.

### Example

```
Input: n = 2
Output: "foobarfoobar"
```

## Approach

Use two semaphores acting as turn tokens: `fooTurn` starts signaled (so `Foo` goes first) and `barTurn` starts unsignaled. Each call to `Foo()` waits for its turn, prints, then releases `barTurn`; each call to `Bar()` waits for its turn, prints, then releases `fooTurn`. This forces strict alternation across the `n` iterations.

## C# Solution

```csharp
public class FooBar
{
    private readonly int n;
    private readonly SemaphoreSlim fooTurn = new(1);
    private readonly SemaphoreSlim barTurn = new(0);

    public FooBar(int n)
    {
        this.n = n;
    }

    public void Foo(Action printFoo)
    {
        for (int i = 0; i < n; i++)
        {
            fooTurn.Wait();
            printFoo();
            barTurn.Release();
        }
    }

    public void Bar(Action printBar)
    {
        for (int i = 0; i < n; i++)
        {
            barTurn.Wait();
            printBar();
            fooTurn.Release();
        }
    }
}
```

## Complexity

- **Time:** `O(n)` synchronization operations per thread.
- **Space:** `O(1)` for the two semaphores.
