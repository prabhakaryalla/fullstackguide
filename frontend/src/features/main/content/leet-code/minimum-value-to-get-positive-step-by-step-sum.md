# 1413. Minimum Value to Get Positive Step by Step Sum

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

Given an array of integers `nums`, find the minimum positive `startValue` such that the running (step-by-step) sum starting from `startValue` never drops below `1`.

### Example

```
Input: nums = [-3,2,-3,4,2]
Output: 5
```

## Approach

Compute the running sum of `nums` while tracking the smallest running sum seen. If that minimum running sum is `m`, then `startValue + m >= 1` must hold, so `startValue >= 1 - m`. The answer is the maximum of `1` and `1 - m`.

## C# Solution

```csharp
public class Solution
{
    public int MinStartValue(int[] nums)
    {
        int runningSum = 0;
        int minSum = 0;

        foreach (var n in nums)
        {
            runningSum += n;
            minSum = Math.Min(minSum, runningSum);
        }

        return Math.Max(1, 1 - minSum);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
