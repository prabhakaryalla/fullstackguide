# 643. Maximum Average Subarray I

**Difficulty:** Easy
**Category:** Array, Sliding Window

## Problem

Given an integer array `nums` and an integer `k`, find the contiguous subarray of length `k` with the maximum average value, and return that average.

### Example

```
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
```

### Constraints

- `n == nums.length`
- `1 <= k <= n <= 10^5`

## Approach

Compute the sum of the first `k` elements, then slide the window one element at a time by adding the new element and subtracting the one that fell out of range, tracking the maximum sum seen. The answer is that maximum sum divided by `k`.

## C# Solution

```csharp
public class Solution
{
    public double FindMaxAverage(int[] nums, int k)
    {
        long windowSum = 0;
        for (int i = 0; i < k; i++)
            windowSum += nums[i];

        long maxSum = windowSum;

        for (int i = k; i < nums.Length; i++)
        {
            windowSum += nums[i] - nums[i - k];
            maxSum = Math.Max(maxSum, windowSum);
        }

        return (double)maxSum / k;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
