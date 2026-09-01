# 2016. Maximum Difference Between Increasing Elements

**Difficulty:** Easy
**Category:** Array

## Problem

Given a 0-indexed integer array `nums` of size `n`, find the maximum difference `nums[j] - nums[i]` such that `0 <= i < j < n` and `nums[i] < nums[j]`. Return the maximum difference, or `-1` if no such pair exists.

## Approach

Scan left to right while tracking the minimum value seen so far (`minSoFar`). For each element, if it's strictly greater than `minSoFar`, it's a valid candidate for `j`, so update the best difference. Otherwise, update `minSoFar` to the current (smaller or equal) value, since a smaller earlier element is always at least as good a candidate for future differences.

## C# Solution

```csharp
public class Solution
{
    public int MaximumDifference(int[] nums)
    {
        int minSoFar = nums[0];
        int best = -1;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] > minSoFar)
                best = Math.Max(best, nums[i] - minSoFar);
            else
                minSoFar = nums[i];
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
