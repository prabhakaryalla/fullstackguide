# 2441. Largest Positive Integer That Exists With Its Negative

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers, Sorting

## Problem

Given an integer array `nums`, return the largest positive integer `k` such that `-k` also exists in the array. If there is no such integer, return -1.

### Example

```
Input: nums = [-1,2,-3,3]
Output: 3
Explanation: 3 is the largest positive integer with its negative -3 also in the array.
```

## Approach

Use a hash set to store all numbers. Iterate through the array and for each positive number, check if its negative exists in the set. Track the maximum such positive number found.

Alternatively, sort the array and use two pointers from both ends to find matching pairs.

## C# Solution

```csharp
public class Solution
{
    public int FindMaxK(int[] nums)
    {
        var set = new HashSet<int>(nums);
        int maxK = -1;
        
        foreach (int num in nums)
        {
            if (num > 0 && set.Contains(-num))
            {
                maxK = Math.Max(maxK, num);
            }
        }
        
        return maxK;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(n) for the hash set
