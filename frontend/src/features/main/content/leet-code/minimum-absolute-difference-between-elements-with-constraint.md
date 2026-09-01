# 2817. Minimum Absolute Difference Between Elements With Constraint

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window, Ordered Set

## Problem

You are given a 0-indexed integer array `nums` and an integer `x`. Find the minimum absolute difference between two elements `nums[i]` and `nums[j]` where `|i - j| >= x`.

Return the minimum absolute difference. If no such pair exists, return `-1`.

### Example

```
Input: nums = [4,3,2,4], x = 2
Output: 0
Explanation: |nums[0] - nums[2]| = |4 - 2| = 2, |nums[0] - nums[3]| = |4 - 4| = 0
Indices differ by at least 2, minimum is 0.
```

## Approach

Use a sliding window with an ordered data structure:

1. Use a sorted set (SortedSet in C#) to maintain elements at valid distances
2. For each position i, maintain elements from positions [0, i-x]
3. For each element, find the closest value in the sorted set
4. Track the minimum absolute difference

## C# Solution

```csharp
public class Solution
{
    public int MinAbsoluteDifference(int[] nums, int x)
    {
        int n = nums.Length;
        if (n == 1)
            return -1;
        
        var sortedSet = new SortedSet<int>();
        int minDiff = int.MaxValue;
        
        for (int i = x; i < n; i++)
        {
            sortedSet.Add(nums[i - x]);
            
            var ceiling = sortedSet.GetViewBetween(nums[i], int.MaxValue).Min;
            if (ceiling != 0 || sortedSet.Contains(nums[i]))
            {
                minDiff = Math.Min(minDiff, Math.Abs(nums[i] - ceiling));
            }
            
            var floor = sortedSet.GetViewBetween(int.MinValue, nums[i]).Max;
            minDiff = Math.Min(minDiff, Math.Abs(nums[i] - floor));
        }
        
        return minDiff == int.MaxValue ? -1 : minDiff;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorted set operations
- **Space:** O(n) for the sorted set
