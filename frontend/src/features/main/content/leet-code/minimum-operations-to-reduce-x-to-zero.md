# 1658. Minimum Operations to Reduce X to Zero

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Sliding Window, Prefix Sum

## Problem

Given an array `nums` and an integer `x`, in one operation you may remove either the leftmost or rightmost element and subtract its value from `x`. Return the minimum number of operations to reduce `x` to exactly `0`, or `-1` if impossible.

### Example

```
Input: nums = [1,1,4,2,3], x = 5
Output: 2
```

## Approach

Removing a prefix and a suffix that together sum to `x` is equivalent to finding the *longest contiguous middle subarray* whose sum equals `total - x` (the elements left behind). Use a sliding window to find the maximum-length subarray summing to `total - x`; the answer is `n` minus that length (or `-1` if no such subarray exists, including the case where `total - x` is negative).

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums, int x)
    {
        int total = nums.Sum();
        int target = total - x;

        if (target < 0)
        {
            return -1;
        }

        if (target == 0)
        {
            return nums.Length;
        }

        int left = 0;
        int sum = 0;
        int best = -1;

        for (int right = 0; right < nums.Length; right++)
        {
            sum += nums[right];

            while (sum > target && left <= right)
            {
                sum -= nums[left];
                left++;
            }

            if (sum == target)
            {
                best = Math.Max(best, right - left + 1);
            }
        }

        return best == -1 ? -1 : nums.Length - best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
