# 2229. Check if an Array Is Consecutive

**Difficulty:** Easy
**Category:** Array, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums`, return `true` if `nums` contains consecutive integers, otherwise return `false`.

An array is consecutive if it contains every number in the range [min(nums), max(nums)] exactly once.

### Example

```
Input: nums = [1,3,2,4]
Output: true
Explanation: The array contains 1, 2, 3, 4 which are consecutive.

Input: nums = [1,3,2,4,6]
Output: false
Explanation: Missing 5 in the range [1, 6].
```

## Approach

1. Find min and max values
2. Check if array length equals (max - min + 1)
3. Check if all values in the range are present (no duplicates)

Alternative: Sort the array and check if consecutive elements differ by 1.

## C# Solution

```csharp
public class Solution
{
    public bool IsConsecutive(int[] nums)
    {
        if (nums.Length == 0) return true;
        
        int min = nums.Min();
        int max = nums.Max();
        
        // Check if length matches the range
        if (nums.Length != max - min + 1)
        {
            return false;
        }
        
        // Check if all values are unique
        HashSet<int> seen = new HashSet<int>(nums);
        return seen.Count == nums.Length;
    }
}
```

Alternative sorting approach:

```csharp
public class Solution
{
    public bool IsConsecutive(int[] nums)
    {
        if (nums.Length == 0) return true;
        
        Array.Sort(nums);
        
        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] != nums[i - 1] + 1)
            {
                return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n), using HashSet or O(n log n) using sorting
- **Space:** O(n) for HashSet or O(1) for sorting approach
