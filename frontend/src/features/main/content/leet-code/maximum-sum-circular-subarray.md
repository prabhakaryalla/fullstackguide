# 918. Maximum Sum Circular Subarray

**Difficulty:** Medium
**Category:** Array, Divide and Conquer, Dynamic Programming, Queue, Monotonic Queue

## Problem

Given a circular integer array `nums`, return the maximum possible sum of a non-empty subarray, where the subarray may wrap around from the end of the array back to the beginning.

### Example

```
Input: nums = [5,-3,5]
Output: 10
Explanation: Subarray [5,5] (wrapping around -3) has maximum sum 5 + 5 = 10.
```

## Approach

The best subarray is either a normal (non-wrapping) subarray, found with Kadane's algorithm, or a wrapping one, which equals the total sum minus the *minimum* subarray sum (found the same way, inverted). If every element is negative, the minimum-subarray trick would incorrectly produce an empty wrap, so fall back to the plain maximum in that case.

## C# Solution

```csharp
public class Solution
{
    public int MaxSubarraySumCircular(int[] nums)
    {
        int total = 0, curMax = 0, maxSum = int.MinValue, curMin = 0, minSum = int.MaxValue;

        foreach (var n in nums)
        {
            total += n;
            curMax = Math.Max(curMax + n, n);
            maxSum = Math.Max(maxSum, curMax);
            curMin = Math.Min(curMin + n, n);
            minSum = Math.Min(minSum, curMin);
        }

        if (maxSum < 0) return maxSum;
        return Math.Max(maxSum, total - minSum);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
