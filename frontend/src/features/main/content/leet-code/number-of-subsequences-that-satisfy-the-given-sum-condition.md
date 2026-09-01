# 1498. Number of Subsequences That Satisfy the Given Sum Condition

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Sorting

## Problem

Given an array `nums` and an integer `target`, count the number of non-empty subsequences where the sum of the minimum and maximum elements is at most `target`. Return the count modulo `10^9 + 7`.

### Example

```
Input: nums = [3,5,6,7], target = 9
Output: 4
```

## Approach

Sort `nums` and use two pointers `left` and `right`. If `nums[left] + nums[right] <= target`, then fixing `nums[left]` as the minimum, every subset of the elements strictly between `left` and `right` can be freely included or excluded alongside `nums[right]` as the maximum, contributing `2^(right - left)` valid subsequences; advance `left`. Otherwise, `nums[right]` is too large to pair with the current minimum, so decrement `right`. Precomputing powers of two modulo `10^9 + 7` keeps each step `O(1)`.

## C# Solution

```csharp
public class Solution
{
    public int NumSubseq(int[] nums, int target)
    {
        const int MOD = 1_000_000_007;
        Array.Sort(nums);
        int n = nums.Length;

        var pow2 = new long[n];
        pow2[0] = 1;
        for (int i = 1; i < n; i++) pow2[i] = pow2[i - 1] * 2 % MOD;

        int left = 0, right = n - 1;
        long count = 0;

        while (left <= right)
        {
            if (nums[left] + nums[right] <= target)
            {
                count = (count + pow2[right - left]) % MOD;
                left++;
            }
            else
            {
                right--;
            }
        }

        return (int)count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(n)` for the precomputed powers of two.
