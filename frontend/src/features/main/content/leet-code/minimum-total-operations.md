# 3353. Minimum Total Operations

**Difficulty:** Medium
**Category:** Array, Math, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an integer array `nums`, in one operation you may increment or decrement any single element by 1. Return the minimum total number of operations required to make every element in the array equal.

### Example

Input: `nums = [1,10,2,9]`

Output: `16`

Explanation: Making every element equal to 2 (the median) costs `|1-2| + |10-2| + |2-2| + |9-2| = 1+8+0+7 = 16`, which is minimal.

## Approach
Minimizing the sum of absolute differences between every element and a single target value is a classic result: the optimal target is the **median** of the array. Sort the array, take the middle element as the target, and sum the absolute differences between every element and that median.

## C# Solution

```csharp
public class Solution 
{
    public long MinOperations(int[] nums) 
    {
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);
        int median = sorted[sorted.Length / 2];

        long ops = 0;
        foreach (int num in nums) 
        {
            ops += Math.Abs(num - median);
        }
        return ops;
    }
}
```

## Complexity

- **Time:** O(n log n) for the sort
- **Space:** O(n)
