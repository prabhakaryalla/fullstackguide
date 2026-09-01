# 2650. Design Cancellable Function

**Difficulty:** Medium
**Category:** Design, Generator, Iterator

## Problem

Given a generator, produce a new "cancellable" generator with the same behavior, except that it also supports early cancellation. Calling `next()` normally resumes execution and returns the next yielded value. However, if the caller signals cancellation instead of requesting the next value, the generator must immediately stop as if execution had returned, and every subsequent request must return a "done" result without executing any further code in the generator body.

### Example

```
Input: sequence yields 1, 2, 3 (logging 1, 2, 3 respectively before each yield)
actions = ["next", "next", "cancel", "next"]
Output values: [1, 2, undefined]
Only "1" and "2" are logged; the value 3 and its log statement never execute.
```

## Approach

This problem is originally implemented with JavaScript generator functions, where `gen.next("cancel")` injects a special value at the paused `yield` point. C# iterators (`yield return`) cannot receive a value injected mid-execution the same way, so the solution is adapted using a wrapper class around an `IEnumerator<int>`. The wrapper exposes `Next()`, which advances the underlying iterator unless cancellation already occurred, and `Cancel()`, which disposes the iterator and marks it as finished so that all further calls to `Next()` return `null` without resuming the sequence.

## C# Solution

```csharp
public class CancellableGenerator
{
    private readonly IEnumerator<int> iterator;
    private bool cancelled;

    public CancellableGenerator(IEnumerable<int> source)
    {
        iterator = source.GetEnumerator();
    }

    // Returns the next value, or null once cancelled or exhausted.
    public int? Next()
    {
        if (cancelled)
        {
            return null;
        }

        if (iterator.MoveNext())
        {
            return iterator.Current;
        }

        cancelled = true;
        return null;
    }

    // Stops the generator permanently; all future Next() calls return null.
    public void Cancel()
    {
        cancelled = true;
        iterator.Dispose();
    }
}

public class Solution
{
    public static CancellableGenerator CreateCancellableGenerator(IEnumerable<int> generatorFn)
    {
        return new CancellableGenerator(generatorFn);
    }
}
```

## Complexity

- **Time:** O(1) per `Next()` or `Cancel()` call.
- **Space:** O(1) additional space beyond the underlying sequence's own state.
