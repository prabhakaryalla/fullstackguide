# 2621. Sleep

**Difficulty:** Easy
**Category:** Closures

## Problem
Implement a function `sleep(millis)` that pauses execution asynchronously and completes (without producing a value) after `millis` milliseconds have elapsed.

## Approach
Adapted to C#: use `Task.Delay`, which asynchronously completes after the requested delay without blocking a thread, and expose it as an `async Task` method.

## C# Solution

```csharp
public class Solution
{
    public async Task Sleep(int millis)
    {
        await Task.Delay(millis);
    }
}
```

## Complexity

- **Time:** O(1) of actual work (excluding the elapsed wait time itself).
- **Space:** O(1).
