# 992. Subarrays with K Different Integers

**Difficulty:** Hard
**Category:** Array, Hash Table, Sliding Window

## Problem

Given an integer array `nums` and an integer `k`, return the number of contiguous subarrays containing exactly `k` distinct integers.

### Example

```
Input: nums = [1,2,1,2,3], k = 2
Output: 7
```

## Approach

Count "exactly `k`" as `AtMost(k) - AtMost(k - 1)`, where `AtMost(m)` counts subarrays with at most `m` distinct integers using a standard sliding window: expand the right edge, shrink the left edge whenever the distinct count exceeds `m`, and add the window's width to the running total at each step.

## C# Solution

```csharp
public class Solution
{
    public int SubarraysWithKDistinct(int[] nums, int k)
    {
        return AtMostK(nums, k) - AtMostK(nums, k - 1);
    }

    private int AtMostK(int[] nums, int k)
    {
        var count = new Dictionary<int, int>();
        int left = 0, result = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            count[nums[right]] = count.GetValueOrDefault(nums[right]) + 1;

            while (count.Count > k)
            {
                count[nums[left]]--;
                if (count[nums[left]] == 0) count.Remove(nums[left]);
                left++;
            }

            result += right - left + 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
