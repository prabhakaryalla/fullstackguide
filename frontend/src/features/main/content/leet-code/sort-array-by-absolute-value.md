# 3667. Sort Array By Absolute Value

**Difficulty:** Easy
**Category:** Array, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums`, return the array sorted in ascending order by the absolute value of its elements. If two elements have the same absolute value, the one with the smaller original value comes first.

### Example

Input: `nums = [-5,3,-2,2,4]`
Output: `[-2,2,3,4,-5]`
Explanation: Sorted by absolute value: 2,2,3,4,5. The two elements with absolute value 2 (`-2` and `2`) are ordered with the smaller original value (`-2`) first.

## Approach

Sort the array using a custom comparator: primary key is `Math.Abs(x)`, tie-broken by the raw value `x` ascending.

## C# Solution

```csharp
public class Solution 
{
    public int[] SortArrayByAbsoluteValue(int[] nums) 
    {
        Array.Sort(nums, (a, b) => 
        {
            int diffAbs = Math.Abs(a) - Math.Abs(b);
            return diffAbs != 0 ? diffAbs : a - b;
        });
        return nums;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(log n) for the sort
