# 2811. Check if it is Possible to Split Array

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem

You are given an array `nums` of length `n` and an integer `m`. You can split the array into subarrays such that:

- Each element appears in exactly one subarray
- Each subarray has a sum of at least `m`

Return `true` if it is possible to split the array this way, or `false` otherwise.

A subarray is a contiguous non-empty sequence of elements within an array.

### Example

```
Input: nums = [2, 2, 1], m = 4
Output: true
Explanation: Split into [2, 2] and [1]. Note: single elements are always valid.
```

## Approach

Key observations:
1. Single-element subarrays are always allowed regardless of their value
2. If we can split into valid parts, we need at least one pair of adjacent elements whose sum >= m
3. Use dynamic programming or observe that if array length <= 2, answer is always true
4. For length > 2, check if there exists any adjacent pair with sum >= m

## C# Solution

```csharp
public class Solution
{
    public bool CanSplitArray(int[] nums, int m)
    {
        int n = nums.Length;
        
        if (n <= 2)
        {
            return true;
        }
        
        for (int i = 0; i < n - 1; i++)
        {
            if (nums[i] + nums[i + 1] >= m)
            {
                return true;
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
