# 1746. Maximum Subarray Sum After One Operation

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums`, you may perform at most one operation: choose an index and replace `nums[i]` with `nums[i] * nums[i]`. Return the maximum possible subarray sum after performing at most one such operation.

### Example

```
Input: nums = [2,-1,-4,-3]
Output: 17
```

## Approach

Track two rolling values while scanning left to right: `dp0`, the best subarray sum ending at the current index without using the operation (classic Kadane), and `dp1`, the best subarray sum ending at the current index having used the operation exactly once. `dp1` either applies the operation at the current index (extending an unmodified subarray, or starting fresh) or extends a subarray that already used the operation earlier by adding the current value unmodified.

## C# Solution

```csharp
public class Solution
{
    public int MaximumSubarraySum(int[] nums)
    {
        long dp0 = 0, dp1 = long.MinValue;
        long best = long.MinValue;

        foreach (int x in nums)
        {
            long square = (long)x * x;
            long newDp0 = Math.Max(x, dp0 + x);
            long newDp1 = Math.Max(square, Math.Max(dp0 + square, dp1 + x));

            dp0 = newDp0;
            dp1 = newDp1;
            best = Math.Max(best, Math.Max(dp0, dp1));
        }

        return (int)best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
