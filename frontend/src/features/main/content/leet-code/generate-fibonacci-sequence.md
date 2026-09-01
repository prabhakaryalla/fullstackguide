# 2648. Generate Fibonacci Sequence

**Difficulty:** Easy
**Category:** Closures

## Problem
Implement a generator that produces the Fibonacci sequence indefinitely: `0, 1, 1, 2, 3, 5, 8, ...`, yielding one additional value each time it is asked for the next one.

## Approach
Adapted to C#: implement an iterator method using `yield return` that maintains the last two Fibonacci values and lazily produces the next one on each iteration of an infinite loop. Consumers can pull values one at a time (e.g. via `GetEnumerator().MoveNext()`/`Current`, or a `foreach` with an early `break`) without ever materializing the whole infinite sequence.

## C# Solution

```csharp
public class Solution
{
    public IEnumerable<long> FibGenerator()
    {
        long a = 0, b = 1;

        while (true)
        {
            yield return a;
            (a, b) = (b, a + b);
        }
    }
}
```

## Complexity

- **Time:** O(1) amortized per generated value.
- **Space:** O(1) — only the last two values are retained at any time.
