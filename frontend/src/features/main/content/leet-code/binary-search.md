# 704. Binary Search

**Difficulty:** Easy
**Category:** Array, Binary Search

## Problem

Given a sorted array of distinct integers `nums` and a `target`, return the index of `target` if it exists, or `-1` otherwise, in `O(log n)` time.

### Example

```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
```

### Constraints

- `1 <= nums.length <= 10^4`
- `nums` is sorted in ascending order.

## Approach

Standard binary search: repeatedly compare the middle element against `target`, narrowing the search range by half each time depending on whether the middle is too small or too large, until the target is found or the range is exhausted.

## C# Solution

```csharp
public class Solution
{
    public int Search(int[] nums, int target)
    {
        int left = 0, right = nums.Length - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
