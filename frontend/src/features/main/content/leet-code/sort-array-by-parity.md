# 905. Sort Array By Parity

**Difficulty:** Easy
**Category:** Array, Two Pointers, Sorting

## Problem

Given an integer array `nums`, move all the even integers to the front, followed by all the odd integers, in any order, and return the resulting array.

### Example

```
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
```

## Approach

Use two pointers from both ends. Advance `left` while it already points at an even number, and `right` while it already points at an odd number. Otherwise swap the two out-of-place elements and continue.

## C# Solution

```csharp
public class Solution
{
    public int[] SortArrayByParity(int[] nums)
    {
        int left = 0, right = nums.Length - 1;

        while (left < right)
        {
            if (nums[left] % 2 == 0) { left++; continue; }
            if (nums[right] % 2 == 1) { right--; continue; }

            (nums[left], nums[right]) = (nums[right], nums[left]);
            left++;
            right--;
        }

        return nums;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` in-place.
