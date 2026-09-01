# 209. Minimum Size Subarray Sum

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window, Prefix Sum

## Problem

Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is greater than or equal to `target`, or `0` if no such subarray exists.

### Example

```
target = 7, nums = [2,3,1,2,4,3] -> 2   (subarray [4,3])
```

## Approach

Since all values are positive, a sliding window works: expand `right` to grow the window's sum, and whenever the sum meets or exceeds `target`, shrink from `left` as much as possible while still satisfying the condition, tracking the smallest window length seen along the way.

## C# Solution

```csharp
public class Solution
{
    public int MinSubArrayLen(int target, int[] nums)
    {
        int left = 0, sum = 0, minLen = int.MaxValue;

        for (int right = 0; right < nums.Length; right++)
        {
            sum += nums[right];

            while (sum >= target)
            {
                minLen = Math.Min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }

        return minLen == int.MaxValue ? 0 : minLen;
    }
}
```

## Complexity

- **Time:** `O(n)` — each element is added and removed from the window at most once.
- **Space:** `O(1)`.
