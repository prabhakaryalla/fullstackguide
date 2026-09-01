# 2855. Minimum Right Shifts to Sort the Array

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed array `nums` of length `n` containing distinct positive integers. Return the minimum number of right shifts required to sort `nums` in non-decreasing order, or -1 if this is impossible.

A right shift is an operation where the last element of the array is removed and inserted at the beginning.

### Example

```
Input: nums = [3,4,5,1,2]
Output: 2
Explanation:
- After 1st shift: [2,3,4,5,1]
- After 2nd shift: [1,2,3,4,5]
The array is now sorted.
```

## Approach

An array can be sorted with right shifts only if it is already sorted or is a rotation of a sorted array. Find the position where the rotation break occurs (where `nums[i] > nums[i+1]`). There should be at most one such position.

If there are zero breaks, the array is already sorted (return 0). If there is exactly one break at position `i`, check if rotating from that point produces a sorted array. The number of right shifts needed is `n - i - 1`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumRightShifts(int[] nums)
    {
        int n = nums.Length;
        int breakPoint = -1;
        
        for (int i = 0; i < n - 1; i++)
        {
            if (nums[i] > nums[i + 1])
            {
                if (breakPoint != -1)
                    return -1;
                breakPoint = i;
            }
        }
        
        if (breakPoint == -1)
            return 0;
        
        if (nums[n - 1] > nums[0])
            return -1;
        
        return n - breakPoint - 1;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass through the array.
- **Space:** `O(1)`.
