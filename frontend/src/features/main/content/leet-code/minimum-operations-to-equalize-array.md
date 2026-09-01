# 3674. Minimum Operations to Equalize Array

**Difficulty:** Easy
**Category:** Array, Math, Sorting

## Problem
You are given an integer array `nums`. In one operation you may increment or decrement any single element by `1`.

Return the minimum total number of operations required to make all elements equal.

## Approach
The value that minimizes the sum of absolute differences to all elements of an array is the **median**. Sort the array, pick the median element as the target, and sum up `|nums[i] - median|` for every element.

## C# Solution

```csharp
public class Solution
{
    public long MinOperations(int[] nums)
    {
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);
        int median = sorted[sorted.Length / 2];

        long operations = 0;
        foreach (int num in nums)
        {
            operations += Math.Abs(num - median);
        }

        return operations;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
