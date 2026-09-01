# 1708. Largest Subarray Length K

**Difficulty:** Easy
**Category:** Array, Greedy

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums` of distinct positive integers and an integer `k`, return the subarray of length `k` that is lexicographically the largest when compared as a sequence of numbers.

### Example

```
Input: nums = [1,4,5,2,3], k = 3
Output: [5,2,3]
```

## Approach

A length-`k` subarray is lexicographically largest exactly when it starts at the position of the maximum value among all valid starting indices (`0` to `n - k`), since a bigger first element always wins regardless of the rest of the subarray.

## C# Solution

```csharp
public class Solution
{
    public int[] LargestSubarray(int[] nums, int k)
    {
        int n = nums.Length;
        int maxIdx = 0;
        for (int i = 1; i <= n - k; i++)
            if (nums[i] > nums[maxIdx]) maxIdx = i;

        int[] result = new int[k];
        Array.Copy(nums, maxIdx, result, 0, k);
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(k)` for the output.
