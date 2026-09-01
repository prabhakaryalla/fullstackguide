# 1060. Missing Element in Sorted Array

**Difficulty:** Medium
**Category:** Array, Binary Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums` sorted in ascending order (all distinct) and an integer `k`, return the `k`-th missing number starting from the leftmost number in the array.

### Example

```
Input: nums = [4,7,9,10], k = 1
Output: 5
```

## Approach

Define `missing(idx) = nums[idx] - nums[0] - idx`, the count of missing numbers up to and including index `idx`. This function is non-decreasing, so binary search for the smallest index where `missing(idx) >= k`. If `k` exceeds the total missing count within the array bounds (`missing(n-1)`), the answer lies beyond the last element, computed directly by extrapolation. Otherwise, once the boundary index is found, the answer sits between `nums[low-1]` and `nums[low]`, offset by however many missing numbers remain after `missing(low-1)`.

## C# Solution

```csharp
public class Solution
{
    public int MissingElement(int[] nums, int k)
    {
        int n = nums.Length;

        int MissingCount(int idx) => nums[idx] - nums[0] - idx;

        if (k > MissingCount(n - 1))
        {
            return nums[n - 1] + (k - MissingCount(n - 1));
        }

        int low = 0, high = n - 1;

        while (low < high)
        {
            int mid = low + (high - low) / 2;
            if (MissingCount(mid) < k) low = mid + 1;
            else high = mid;
        }

        return nums[low - 1] + (k - MissingCount(low - 1));
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
