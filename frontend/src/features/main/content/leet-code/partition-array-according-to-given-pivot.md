# 2161. Partition Array According to Given Pivot

**Difficulty:** Medium
**Category:** Array, Two Pointers, Simulation

## Problem

You are given an array `nums` and an integer `pivot`. Rearrange `nums` such that:
- All elements less than `pivot` appear before all elements equal to `pivot`
- All elements equal to `pivot` appear before all elements greater than `pivot`
- The relative order of elements in each group is preserved

Return the rearranged array.

### Example

```
Input: nums = [9,12,5,10,14,3,10], pivot = 10
Output: [9,5,3,10,10,12,14]
Explanation: Elements < 10: [9,5,3], = 10: [10,10], > 10: [12,14]
```

## Approach

Make three passes through the array (or use three lists):
1. Collect all elements less than pivot (in order)
2. Collect all elements equal to pivot (in order)
3. Collect all elements greater than pivot (in order)
4. Concatenate the three groups

## C# Solution

```csharp
public class Solution
{
    public int[] PivotArray(int[] nums, int pivot)
    {
        var less = new List<int>();
        var equal = new List<int>();
        var greater = new List<int>();
        
        foreach (int num in nums)
        {
            if (num < pivot)
                less.Add(num);
            else if (num == pivot)
                equal.Add(num);
            else
                greater.Add(num);
        }
        
        var result = new int[nums.Length];
        int index = 0;
        
        foreach (int num in less)
            result[index++] = num;
        foreach (int num in equal)
            result[index++] = num;
        foreach (int num in greater)
            result[index++] = num;
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(n) for the three lists
