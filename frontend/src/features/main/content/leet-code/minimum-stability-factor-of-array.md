# 3605. Minimum Stability Factor of Array

**Difficulty:** Medium
**Category:** Array, Sorting, Greedy

## Problem
Define the **stability factor** of an arrangement of an array as the maximum absolute difference between any two *adjacent* elements in that arrangement. Given an integer array `nums`, you may rearrange its elements into any order. Return the minimum possible stability factor achievable over all rearrangements.

## Approach
Sorting the array is always an optimal arrangement. Intuitively, if any two values with a large gap between them exist in the sorted order, then in *any* arrangement of the array, elements must eventually transition from "below the gap" to "above the gap" (or vice versa) at some adjacent pair, and that pair's difference is at least the size of the gap — so no arrangement can do better than the largest gap between consecutive values in sorted order. Sorting the array achieves exactly that bound, since all adjacent differences in the sorted array equal the consecutive gaps. Therefore, sort `nums` and return the maximum difference between consecutive elements.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumStabilityFactor(int[] nums) 
    {
        Array.Sort(nums);

        int maxGap = 0;
        for (int i = 1; i < nums.Length; i++)
            maxGap = Math.Max(maxGap, nums[i] - nums[i - 1]);

        return maxGap;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1) extra space (excluding sort overhead)
