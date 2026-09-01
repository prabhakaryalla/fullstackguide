# 960. Delete Columns to Make Sorted III

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of equal-length strings `strs`, return the minimum number of columns to delete so that, reading each individual row left to right over the *remaining* columns, every row's characters are non-decreasing.

### Example

```
Input: strs = ["babca","bbazb"]
Output: 3
```

## Approach

This reduces to finding the longest subsequence of column indices such that, for every row, the characters at those columns are non-decreasing — an LIS-style DP over columns. `dp[i]` is the length of the longest such valid column subsequence ending at column `i`; a column `j < i` can extend it only if every row's character at `j` is `<=` its character at `i`. The answer is `totalColumns - maxSubsequenceLength`.

## C# Solution

```csharp
public class Solution
{
    public int MinDeletionSize(string[] strs)
    {
        int n = strs[0].Length;
        var dp = new int[n];
        Array.Fill(dp, 1);
        int maxLen = 1;

        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                bool valid = true;

                foreach (var s in strs)
                {
                    if (s[j] > s[i]) { valid = false; break; }
                }

                if (valid) dp[i] = Math.Max(dp[i], dp[j] + 1);
            }

            maxLen = Math.Max(maxLen, dp[i]);
        }

        return n - maxLen;
    }
}
```

## Complexity

- **Time:** `O(cols^2 * rows)`.
- **Space:** `O(cols)`.
