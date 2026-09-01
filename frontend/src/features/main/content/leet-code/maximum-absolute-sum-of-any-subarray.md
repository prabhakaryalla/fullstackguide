# 1749. Maximum Absolute Sum of Any Subarray

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

Given an integer array `nums`, return the maximum absolute value of the sum of any (non-empty) contiguous subarray.

### Example

```
Input: nums = [1,-3,2,3,-4]
Output: 5
```

## Approach

The absolute sum of a subarray `[i+1, j]` equals `|prefix[j] - prefix[i]|`. Track the running prefix sum along with the maximum and minimum prefix sums seen so far; at each step, compare the current prefix against both extremes to find the largest possible absolute difference.

## C# Solution

```csharp
public class Solution
{
    public int MaxAbsoluteSum(int[] nums)
    {
        int prefix = 0, maxPrefix = 0, minPrefix = 0;
        int best = 0;

        foreach (int x in nums)
        {
            prefix += x;
            best = Math.Max(best, Math.Abs(prefix - maxPrefix));
            best = Math.Max(best, Math.Abs(prefix - minPrefix));
            maxPrefix = Math.Max(maxPrefix, prefix);
            minPrefix = Math.Min(minPrefix, prefix);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
