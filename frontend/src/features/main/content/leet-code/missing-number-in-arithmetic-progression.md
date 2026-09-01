# 1228. Missing Number In Arithmetic Progression

**Difficulty:** Easy
**Category:** Array, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

An arithmetic progression had exactly one element removed before being handed to you as `arr` (with its first and last original elements intact). Return the value that was removed.

### Example

```
Input: arr = [5,7,11,13]
Output: 9
```

## Approach

If the original progression (before removal) had `arr.Length + 1` terms, its common difference equals `(arr[last] - arr[first]) / arr.Length`, since exactly one gap is "doubled" by the missing term while all others are the true, single difference — algebraically this still divides out evenly across the full span. Walk the array comparing each element to what it should be (`arr[0] + difference * index`); the first mismatch reveals the missing value.

## C# Solution

```csharp
public class Solution
{
    public int MissingNumber(int[] arr)
    {
        int n = arr.Length;
        int difference = (arr[n - 1] - arr[0]) / n;

        for (int i = 0; i < n - 1; i++)
        {
            int expected = arr[0] + difference * (i + 1);
            if (arr[i + 1] != expected) return expected;
        }

        return arr[0] + difference * n;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `arr`.
- **Space:** `O(1)`.
