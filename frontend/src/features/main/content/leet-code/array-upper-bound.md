# 2774. Array Upper Bound

**Difficulty:** Medium
**Category:** Array, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an array of integers `nums` sorted in non-decreasing order and an integer `target`, return the index of the last (rightmost) occurrence of `target` in `nums`. If `target` does not occur in `nums`, return `-1`.

### Example
```
Input: nums = [1,2,4,4,5], target = 4
Output: 3
```

## Approach
Binary search for the rightmost index whose value equals `target`. While narrowing the search range, whenever `nums[mid] <= target`, record `mid` as the best candidate answer if it equals `target` and continue searching further right; otherwise search to the left. The last recorded candidate is the answer.

## C# Solution

```csharp
public class Solution
{
    public int UpperBound(int[] nums, int target)
    {
        int lo = 0, hi = nums.Length - 1, result = -1;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] <= target)
            {
                if (nums[mid] == target)
                {
                    result = mid;
                }
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(log n).
- **Space:** O(1).
