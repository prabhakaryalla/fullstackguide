# 930. Binary Subarrays With Sum

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window, Prefix Sum

## Problem

Given a binary array `nums` and an integer `goal`, return the number of non-empty subarrays whose sum equals `goal`.

### Example

```
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
```

## Approach

Count subarrays with sum exactly `goal` as `AtMost(goal) - AtMost(goal - 1)`, where `AtMost(g)` counts subarrays with sum `<= g` using a sliding window: for each right endpoint, shrink the left edge while the window sum exceeds `g`, then add the window's width to the running total.

## C# Solution

```csharp
public class Solution
{
    public int NumSubarraysWithSum(int[] nums, int goal)
    {
        return AtMost(nums, goal) - AtMost(nums, goal - 1);
    }

    private int AtMost(int[] nums, int goal)
    {
        if (goal < 0) return 0;

        int left = 0, sum = 0, result = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            sum += nums[right];
            while (sum > goal) sum -= nums[left++];
            result += right - left + 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
