# 3774. Absolute Difference Between Maximum and Minimum K Elements

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an integer array `nums` and integer `k`, find the absolute difference between the sum of the `k` largest elements and the sum of the `k` smallest elements.

### Example

Input: `nums = [5,2,2,4], k = 2`
Output: `5`

The 2 largest are `4,5` (sum 9); the 2 smallest are `2,2` (sum 4); `|9-4|=5`.

## Approach

Sort the array. Sum the last `k` elements (largest) and the first `k` elements (smallest), then take the absolute difference.

## C# Solution

```csharp
public class Solution 
{
    public int MaxMinDifference(int[] nums, int k) 
    {
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);
        int n = sorted.Length;
        long maxSum = 0, minSum = 0;
        for (int i = 0; i < k; i++)
        {
            maxSum += sorted[n - 1 - i];
            minSum += sorted[i];
        }
        return (int)Math.Abs(maxSum - minSum);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
