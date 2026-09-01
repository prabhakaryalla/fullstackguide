# 1027. Longest Arithmetic Subsequence

**Difficulty:** Medium
**Category:** Array, Binary Search, Dynamic Programming

## Problem

Given an array of integers `nums`, return the length of the longest arithmetic subsequence within it.

### Example

```
Input: nums = [3,6,9,12]
Output: 4
```

## Approach

For each index `i`, keep a dictionary mapping "common difference" to "length of the longest arithmetic subsequence ending at `i` with that difference". For every earlier index `j`, the difference `nums[i] - nums[j]` extends whatever subsequence ended at `j` with that same difference by one element (or starts a new length-`2` subsequence if none existed). Track the best length seen across all indices and differences.

## C# Solution

```csharp
public class Solution
{
    public int LongestArithSeqLength(int[] nums)
    {
        int n = nums.Length;
        var dp = new Dictionary<int, int>[n];
        for (int i = 0; i < n; i++) dp[i] = new Dictionary<int, int>();

        int best = 1;

        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                int diff = nums[i] - nums[j];
                int length = dp[j].TryGetValue(diff, out var prevLength) ? prevLength + 1 : 2;

                if (!dp[i].TryGetValue(diff, out var existing) || length > existing)
                {
                    dp[i][diff] = length;
                }

                best = Math.Max(best, dp[i][diff]);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — every pair of indices is considered once.
- **Space:** `O(n^2)` worst case across all the per-index dictionaries.
