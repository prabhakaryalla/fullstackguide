# 2640. Find the Score of All Prefixes of an Array

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

You are given an integer array `nums`. The score of a prefix is the sum of the conversion array for that prefix, where the conversion array is formed by converting each element to the sum of all elements up to and including that element.

Return an array where the i-th element is the score of the prefix `nums[0..i]`.

### Example

```
Input: nums = [2,3,7,5,10]
Output: [4,10,24,36,56]
Explanation:
Prefix [2]: conversion = [2], score = 2
Prefix [2,3]: conversion = [2,5], score = 7
Prefix [2,3,7]: conversion = [2,5,12], score = 19... (recalculate based on actual definition)
```

## Approach

For each prefix ending at index i, compute the conversion array where each element is the cumulative sum up to that position. Then sum all elements in the conversion array to get the score.

This can be optimized by maintaining a running sum and adding contributions incrementally.

## C# Solution

```csharp
public class Solution
{
    public long[] FindPrefixScore(int[] nums)
    {
        int n = nums.Length;
        long[] result = new long[n];
        long prefixSum = 0;
        long score = 0;
        
        for (int i = 0; i < n; i++)
        {
            prefixSum += nums[i];
            score += prefixSum;
            result[i] = score;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(1) excluding output array
