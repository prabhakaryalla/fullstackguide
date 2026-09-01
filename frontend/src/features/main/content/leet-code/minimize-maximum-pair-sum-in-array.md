# 1877. Minimize Maximum Pair Sum in Array

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting, Greedy

## Problem

Given an even-length integer array `nums`, pair up all elements into `n/2` pairs such that the maximum pair sum across all pairs is minimized. Return that minimized maximum pair sum.

### Example

```
Input: nums = [3,5,2,3]
Output: 7
```

## Approach

Sort the array. Pairing the smallest remaining element with the largest remaining element (i.e., `nums[i]` with `nums[n-1-i]`) balances every pair sum as evenly as possible, which is the optimal strategy for minimizing the maximum pair sum. Track the largest such pair sum across all `n/2` pairs.

## C# Solution

```csharp
public class Solution
{
    public int MinPairSum(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int best = 0;

        for (int i = 0; i < n / 2; i++)
        {
            best = Math.Max(best, nums[i] + nums[n - 1 - i]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
