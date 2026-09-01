# 2824. Count Pairs Whose Sum is Less than Target

**Difficulty:** Easy
**Category:** Array, Two Pointers, Sorting

## Problem

Given a 0-indexed integer array nums of length n and an integer target, return the number of pairs (i, j) where 0 <= i < j < n and nums[i] + nums[j] < target.

### Example

```
Input: nums = [-1,1,2,3,1], target = 2
Output: 3
Explanation: There are 3 pairs whose sum is less than 2:
(-1, 1), (-1, 2), (-1, 3)
```

## Approach

This is a classic two-pointer problem. We first sort the array, then use two pointers: one starting from the beginning (left) and one from the end (right).

For each position of the left pointer, we find the rightmost position where nums[left] + nums[right] < target. All indices between left and right (exclusive) form valid pairs with left.

If the sum is less than target, we can count (right - left) pairs and move left forward. If the sum is greater than or equal to target, we move right backward.

## C# Solution

```csharp
public class Solution
{
    public int CountPairs(List<int> nums, int target)
    {
        nums.Sort();
        int count = 0;
        int left = 0;
        int right = nums.Count - 1;
        
        while (left < right)
        {
            if (nums[left] + nums[right] < target)
            {
                count += right - left;
                left++;
            }
            else
            {
                right--;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting, where n is the length of nums
- **Space:** O(1) if we ignore the space used by sorting
