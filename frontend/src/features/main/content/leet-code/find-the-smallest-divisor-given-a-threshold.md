# 1283. Find the Smallest Divisor Given a Threshold

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given an integer array `nums` and an integer `threshold`, find the smallest positive integer `divisor` such that the sum of each element divided by `divisor` and rounded up does not exceed `threshold`.

### Example

```
Input: nums = [1,2,5,9], threshold = 6
Output: 5
```

## Approach

The sum of ceiling-divided values is a non-increasing function of the divisor: larger divisors only ever shrink or keep equal each term's contribution. That monotonicity makes binary search viable — search divisors from `1` up to the largest element in `nums`, computing the ceiling-division sum for each candidate midpoint, and narrowing toward the smallest divisor whose sum still fits within `threshold`.

## C# Solution

```csharp
public class Solution
{
    public int SmallestDivisor(int[] nums, int threshold)
    {
        int lo = 1, hi = nums.Max();

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (ComputeSum(nums, mid) <= threshold) hi = mid;
            else lo = mid + 1;
        }

        return lo;
    }

    private long ComputeSum(int[] nums, int divisor)
    {
        long sum = 0;
        foreach (int num in nums)
            sum += (num + divisor - 1) / divisor;
        return sum;
    }
}
```

## Complexity

- **Time:** `O(n log(maxValue))`, where `n` is the length of `nums`.
- **Space:** `O(1)`.
