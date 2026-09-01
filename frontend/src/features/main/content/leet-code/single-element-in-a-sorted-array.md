# 540. Single Element in a Sorted Array

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given a sorted array `nums` where every element appears exactly twice except one element that appears exactly once, return that single element. The solution must run in `O(log n)` time and `O(1)` space.

### Example

```
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

## Approach

Before the single element, every pair starts at an even index (`nums[2i] == nums[2i+1]`); after it, the pairing shifts so pairs start at odd indices. Binary search on an even midpoint: if it matches its right neighbor, the single element lies to the right (the pairing hasn't shifted yet), otherwise it lies at or before the midpoint.

## C# Solution

```csharp
public class Solution
{
    public int SingleNonDuplicate(int[] nums)
    {
        int left = 0, right = nums.Length - 1;

        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (mid % 2 == 1) mid--;

            if (nums[mid] == nums[mid + 1])
                left = mid + 2;
            else
                right = mid;
        }

        return nums[left];
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
