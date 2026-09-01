# 2665. Counter II

**Difficulty:** Easy
**Category:** Closure, Design

## Problem

Write a function `createCounter(init)` that accepts an initial integer `init` and returns an object exposing three operations:

- `increment()` increases the current value by 1 and returns it.
- `decrement()` decreases the current value by 1 and returns it.
- `reset()` sets the current value back to `init` and returns it.

### Example

```
Input: init = 5, calls = ["increment", "reset", "decrement"]
Output: [6, 5, 4]
```

## Approach

The original JavaScript solution relies on a closure that captures a mutable `currentValue` variable shared by the three returned functions. In C#, the same closure behavior is achieved by capturing a local variable inside lambdas/local functions returned from a factory method — each call shares and mutates the same captured `current` field.

## C# Solution

```csharp
public class Solution
{
    public static (Func<int> Increment, Func<int> Decrement, Func<int> Reset) CreateCounter(int init)
    {
        int current = init;

        int Increment() => ++current;
        int Decrement() => --current;
        int Reset()
        {
            current = init;
            return current;
        }

        return (Increment, Decrement, Reset);
    }
}
```

## Complexity

- **Time:** O(1) per operation.
- **Space:** O(1).
