# 3627. Maximum Median Sum of Subsequences of Size 3

**Difficulty:** Medium
**Category:** Greedy, Sorting, Array

## Problem

Given an array `nums` whose length is a multiple of 3, partition all elements into groups of 3. Return the maximum possible sum of the medians of all groups.

### Example

`nums = [1,2,3,4,5,6]`: skip the smallest 2 elements (1,2), pair the rest as medians 4 and 6 → sum = 4 + 6 = 10. Wait, taking every other element from `[3,4,5,6]` starting at index 0 gives medians 3 and 5, sum = 8, which is optimal since grouping `(1,3,4)` and `(2,5,6)` gives medians 3 and 5.

## Approach

Sort the array. The smallest `n/3` elements should always be the "low" element of some group. From the remaining `2n/3` sorted elements, the optimal median of each group is obtained by taking every other element starting right after the skipped prefix.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumMedianSum(int[] nums) 
    {
        Array.Sort(nums);
        int n = nums.Length;
        int skip = n / 3;
        long sum = 0;
        for (int i = skip; i < n - 1; i += 2) 
        {
            sum += nums[i];
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(log n) for sorting
