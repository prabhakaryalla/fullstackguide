# 644. Maximum Average Subarray II

**Difficulty:** Hard
**Category:** Array, Binary Search, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums` and an integer `k`, find the maximum average value of any contiguous subarray with length **at least** `k`.

### Example

```
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 6.50000
```

### Constraints

- `1 <= k <= n <= 10^4`

## Approach

Binary search on the answer (the target average) within the range of possible values. For a candidate average `mid`, subtract `mid` from every element and check whether any subarray of length `>= k` has a non-negative sum — if so, a subarray with average `>= mid` exists, and `mid` can be raised; otherwise it must be lowered. Checking feasibility efficiently: compute the fixed-length-`k` window sum first, then extend further by tracking the minimum prefix sum seen at least `k` elements back, allowing the current running sum to be compared against that minimum for arbitrarily longer subarrays.

## C# Solution

```csharp
public class Solution
{
    public double FindMaxAverage(int[] nums, int k)
    {
        double left = nums.Min(), right = nums.Max();
        double epsilon = 1e-5;

        while (right - left > epsilon)
        {
            double mid = (left + right) / 2;

            if (CanFindSubarrayWithAverageAtLeast(nums, k, mid))
                left = mid;
            else
                right = mid;
        }

        return left;
    }

    private bool CanFindSubarrayWithAverageAtLeast(int[] nums, int k, double mid)
    {
        double sum = 0;
        for (int i = 0; i < k; i++)
            sum += nums[i] - mid;

        if (sum >= 0) return true;

        double prefixSum = 0;
        double minPrefixSum = 0;

        for (int i = k; i < nums.Length; i++)
        {
            sum += nums[i] - mid;
            prefixSum += nums[i - k] - mid;
            minPrefixSum = Math.Min(minPrefixSum, prefixSum);

            if (sum - minPrefixSum >= 0) return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n log(1/ε))`, where `ε` is the desired precision.
- **Space:** `O(1)`.
