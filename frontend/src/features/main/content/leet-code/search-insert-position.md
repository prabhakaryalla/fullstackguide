# 35. Search Insert Position

**Difficulty:** Easy
**Category:** Array, Binary Search

## Problem

Given a sorted array of distinct integers `nums` and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with `O(log n)` runtime complexity.

### Example 1

```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

### Example 2

```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

### Example 3

```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` contains distinct values sorted in ascending order.
- `-10^4 <= target <= 10^4`

## Approach

This is a direct lower-bound binary search: narrow `[lo, hi]` until it collapses to the first index whose value is `>= target`. That index is either where `target` exists or where it should be inserted.

## C# Solution

```csharp
public class Solution
{
    public int SearchInsert(int[] nums, int target)
    {
        int lo = 0, hi = nums.Length;

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
