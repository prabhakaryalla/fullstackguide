# 1099. Two Sum Less Than K

**Difficulty:** Easy
**Category:** Array, Two Pointers, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `nums` and an integer `k`, return the maximum sum of two distinct elements in `nums` that is strictly less than `k`. Return `-1` if no such pair exists.

### Example

```
Input: nums = [34,23,1,24,75,33,54,8], k = 60
Output: 58
```

## Approach

Sort the array, then use two pointers starting at the opposite ends. If the current pair's sum is less than `k`, it's a valid candidate — record it and move the left pointer inward to try for a possibly larger valid sum. Otherwise, the sum is too big, so move the right pointer inward to try smaller values. Continue until the pointers meet.

## C# Solution

```csharp
public class Solution
{
    public int TwoSumLessThanK(int[] nums, int k)
    {
        Array.Sort(nums);
        int left = 0, right = nums.Length - 1;
        int best = -1;

        while (left < right)
        {
            int sum = nums[left] + nums[right];

            if (sum < k)
            {
                best = Math.Max(best, sum);
                left++;
            }
            else
            {
                right--;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(log n)` to `O(n)` depending on the sort implementation.
