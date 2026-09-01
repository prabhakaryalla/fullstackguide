# 2148. Count Elements With Strictly Smaller and Greater Elements

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an integer array `nums`, return the number of elements that have both a strictly smaller element and a strictly greater element in the array.

### Example

```
Input: nums = [11,7,2,15]
Output: 2
Explanation: 7 and 11 have both smaller and greater elements.

Input: nums = [-3,3,3,90]
Output: 2
Explanation: The two 3's have both -3 (smaller) and 90 (greater).
```

## Approach

Find the minimum and maximum values in the array. Count how many elements are strictly between these two values (not equal to min or max).

## C# Solution

```csharp
public class Solution
{
    public int CountElements(int[] nums)
    {
        if (nums.Length <= 2)
            return 0;
        
        int min = nums.Min();
        int max = nums.Max();
        
        if (min == max)
            return 0;
        
        int count = 0;
        foreach (int num in nums)
        {
            if (num > min && num < max)
                count++;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1)
