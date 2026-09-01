# 2592. Maximize Greatness of an Array

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Two Pointers

## Problem

You are given a 0-indexed integer array `nums`. You can permute `nums` into any order. The greatness of `nums` is the number of indices `0 <= i < nums.length` for which `perm[i] > nums[i]`.

Return the maximum possible greatness you can achieve after permuting `nums`.

### Example

```
Input: nums = [1,3,5,2,1,3,1]
Output: 4
Explanation: 
Permute to [1,1,1,2,3,3,5]
Original:  [1,3,5,2,1,3,1]
Permuted > original at 4 positions
```

## Approach

Sort both the original array and a copy of it. Use a two-pointer approach: try to match each element in the sorted original with the smallest element in the sorted copy that is strictly greater. This greedy approach maximizes the count.

The key insight is that to maximize greatness, we should try to beat each element with the smallest possible larger element, leaving larger elements available to beat other values.

## C# Solution

```csharp
public class Solution
{
    public int MaximizeGreatness(int[] nums)
    {
        Array.Sort(nums);
        var perm = (int[])nums.Clone();
        
        int i = 0;
        int j = 0;
        int count = 0;
        
        while (i < nums.Length && j < perm.Length)
        {
            if (perm[j] > nums[i])
            {
                count++;
                i++;
                j++;
            }
            else
            {
                j++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the cloned array
