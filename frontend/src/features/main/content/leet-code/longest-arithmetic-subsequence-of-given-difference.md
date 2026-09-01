# 1218. Longest Arithmetic Subsequence of Given Difference

**Difficulty:** Medium
**Category:** Array, Hash Table, Dynamic Programming

## Problem

Given an integer array `arr` and an integer `difference`, return the length of the longest subsequence of `arr` that forms an arithmetic sequence with the given common `difference`.

### Example

```
Input: arr = [1,2,3,4], difference = 1
Output: 4
```

## Approach

Process the array left to right, tracking with a dictionary `dp[value]` = length of the longest valid arithmetic subsequence ending in `value`. For each new number, its subsequence can extend the one ending in `num - difference`, so `dp[num] = dp[num - difference] + 1` (or `1` if no such subsequence exists yet). The answer is the maximum value seen across all updates.

## C# Solution

```csharp
public class Solution
{
    public int LongestSubsequence(int[] arr, int difference)
    {
        var dp = new Dictionary<int, int>();
        int best = 0;

        foreach (int num in arr)
        {
            int prev = dp.GetValueOrDefault(num - difference, 0);
            dp[num] = prev + 1;
            best = Math.Max(best, dp[num]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `arr`.
- **Space:** `O(n)` for the dictionary.
