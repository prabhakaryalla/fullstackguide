# 795. Number of Subarrays with Bounded Maximum

**Difficulty:** Medium
**Category:** Array, Two Pointers

## Problem

Given an integer array `nums` and two integers `left` and `right`, return the number of contiguous subarrays where the maximum element is within the inclusive range `[left, right]`.

### Example

```
Input: nums = [2,1,4,3], left = 2, right = 3
Output: 3
```

## Approach

Compute the number of subarrays whose maximum is at most a given bound using a helper that resets a running count of consecutive elements `<= bound` whenever an element exceeds it, and accumulates that running count at every position (since every subarray ending at the current position, starting anywhere within the current valid run, qualifies). The answer is then the count of subarrays with maximum `<= right` minus the count with maximum `<= left - 1`, isolating exactly those subarrays whose maximum falls in `[left, right]`.

## C# Solution

```csharp
public class Solution
{
    public int NumSubarrayBoundedMax(int[] nums, int left, int right)
    {
        return CountAtMost(nums, right) - CountAtMost(nums, left - 1);
    }

    private int CountAtMost(int[] nums, int bound)
    {
        int count = 0, current = 0;

        foreach (var num in nums)
        {
            current = num <= bound ? current + 1 : 0;
            count += current;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
