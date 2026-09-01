# 1150. Check If a Number Is Majority Element in a Sorted Array

**Difficulty:** Easy
**Category:** Array, Binary Search, Counting

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a sorted integer array `nums` and a `target`, return `true` if `target` appears strictly more than `nums.Length / 2` times.

### Example

```
Input: nums = [2,4,5,5,5,5,5,6,6], target = 5
Output: true
```

## Approach

Since `nums` is sorted, all occurrences of `target` form one contiguous block. Binary search for the first index where `target` occurs; if `target` is truly a majority element, then the position exactly `n / 2` slots after that first occurrence must still be `target` (because a majority run spans more than half the array).

## C# Solution

```csharp
public class Solution
{
    public bool IsMajorityElement(int[] nums, int target)
    {
        int first = LowerBound(nums, target);
        if (first == nums.Length || nums[first] != target) return false;

        int n = nums.Length;
        int majorityIndex = first + n / 2;
        return majorityIndex < n && nums[majorityIndex] == target;
    }

    private int LowerBound(int[] nums, int target)
    {
        int lo = 0, hi = nums.Length;

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
