# 474. Ones and Zeroes

**Difficulty:** Medium
**Category:** Array, String, Dynamic Programming

## Problem

Given an array of binary strings `strs` and two integers `m` and `n`, return the size of the largest subset of `strs` such that there are at most `m` `0`'s and `n` `1`'s in the subset.

### Example

```
Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
```

### Constraints

- `1 <= strs.length <= 600`
- `1 <= strs[i].length <= 100`
- `strs[i]` consists only of digits `'0'` and `'1'`.
- `1 <= m, n <= 100`

## Approach

This is a 0/1 knapsack problem with two capacity dimensions: available zeros (`m`) and available ones (`n`). Maintain a 2D DP table `dp[i][j]` representing the maximum subset size using at most `i` zeros and `j` ones. For each string, count its zeros and ones, then update the table in reverse order over both dimensions to avoid reusing the same string twice.

## C# Solution

```csharp
public class Solution
{
    public int FindMaxForm(string[] strs, int m, int n)
    {
        var dp = new int[m + 1, n + 1];

        foreach (var str in strs)
        {
            int zeros = str.Count(c => c == '0');
            int ones = str.Length - zeros;

            for (int i = m; i >= zeros; i--)
            {
                for (int j = n; j >= ones; j--)
                {
                    dp[i, j] = Math.Max(dp[i, j], dp[i - zeros, j - ones] + 1);
                }
            }
        }

        return dp[m, n];
    }
}
```

## Complexity

- **Time:** `O(len(strs) * m * n)`.
- **Space:** `O(m * n)` for the DP table.
