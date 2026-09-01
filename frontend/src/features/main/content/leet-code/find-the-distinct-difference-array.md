# 2670. Find the Distinct Difference Array

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

You are given a 0-indexed array `nums` of length `n`.

The distinct difference array of `nums` is an array `diff` of length `n` such that `diff[i]` is equal to the number of distinct elements in the suffix `nums[i + 1, ..., n - 1]` subtracted from the number of distinct elements in the prefix `nums[0, ..., i]`.

Return the distinct difference array of `nums`.

### Example

```
Input: nums = [1,2,3,4,5]
Output: [-3,-1,1,3,5]
Explanation:
For i = 0, prefix = [1], suffix = [2,3,4,5], diff[0] = 1 - 4 = -3.
For i = 1, prefix = [1,2], suffix = [3,4,5], diff[1] = 2 - 3 = -1.
For i = 2, prefix = [1,2,3], suffix = [4,5], diff[2] = 3 - 2 = 1.
For i = 3, prefix = [1,2,3,4], suffix = [5], diff[3] = 4 - 1 = 3.
For i = 4, prefix = [1,2,3,4,5], suffix = [], diff[4] = 5 - 0 = 5.

Input: nums = [3,2,3,4,2]
Output: [-2,-1,0,2,3]
```

## Approach

Precompute the number of distinct elements in each suffix using a hash set, iterating from right to left. Then iterate from left to right, maintaining a hash set of elements seen so far in the prefix, and calculate the difference at each position.

## C# Solution

```csharp
public class Solution
{
    public int[] DistinctDifferenceArray(int[] nums)
    {
        int n = nums.Length;
        int[] result = new int[n];
        int[] suffixDistinct = new int[n + 1];
        var suffixSet = new HashSet<int>();
        
        for (int i = n - 1; i >= 0; i--)
        {
            suffixSet.Add(nums[i]);
            suffixDistinct[i] = suffixSet.Count;
        }
        
        var prefixSet = new HashSet<int>();
        
        for (int i = 0; i < n; i++)
        {
            prefixSet.Add(nums[i]);
            result[i] = prefixSet.Count - suffixDistinct[i + 1];
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n) for the hash sets and suffix array
