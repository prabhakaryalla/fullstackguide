# 1752. Check if Array Is Sorted and Rotated

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array `nums`, return `true` if it could have been obtained by rotating a sorted (non-descending) array by some number of positions.

### Example

```
Input: nums = [3,4,5,1,2]
Output: true
```

## Approach

In a rotated sorted array, there is at most one position where an element is greater than the element that (cyclically) follows it. Count how many such "drops" occur (including the wraparound from the last element to the first); the array qualifies if there is at most one.

## C# Solution

```csharp
public class Solution
{
    public bool Check(int[] nums)
    {
        int n = nums.Length;
        int drops = 0;

        for (int i = 0; i < n; i++)
            if (nums[i] > nums[(i + 1) % n]) drops++;

        return drops <= 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
