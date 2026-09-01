# 2723. Add Two Promises

**Difficulty:** Easy
**Category:** Concurrency

## Problem
Given two promises `promise1` and `promise2` that each resolve to a number, return a new promise that resolves to the sum of the two resolved values. Both promises should be awaited concurrently rather than one after the other.

### Example
```
Input: promise1 resolves to 3 (after 300ms), promise2 resolves to 4 (after 200ms)
Output: 7
Explanation: Both promises resolve, and their sum 3 + 4 = 7 is returned once both have settled.
```

## Approach
Adapted to C# using `Task<double>` in place of JavaScript promises. Await both tasks concurrently with `Task.WhenAll` so they run in parallel instead of sequentially, then return the sum of the two resolved values.

## C# Solution

```csharp
public class Solution
{
    public static async Task<double> AddTwoPromises(Task<double> promise1, Task<double> promise2)
    {
        var results = await Task.WhenAll(promise1, promise2);
        return results[0] + results[1];
    }
}
```

## Complexity

- **Time:** O(1) beyond awaiting the two underlying tasks.
- **Space:** O(1).
