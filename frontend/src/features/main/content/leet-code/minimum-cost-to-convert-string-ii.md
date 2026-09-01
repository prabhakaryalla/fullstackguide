# 2977. Minimum Cost to Convert String II

**Difficulty:** Hard
**Category:** Graph, String, Dynamic Programming, Shortest Path

## Problem

Similar to problem 2976, but now you can convert substrings (not just individual characters). You are given `source`, `target`, and arrays of strings `original`, `changed` with corresponding `cost`.

Return the minimum cost to convert `source` to `target`, or -1 if impossible.

### Example

```
Input: source = "abcd", target = "acbe", original = ["a","b","c"], changed = ["b","c","e"], cost = [2,5,3]
Output: 10

Input: source = "abcdefgh", target = "acdeeghh", original = ["bcd","fgh","thh"], changed = ["cde","thh","ghh"], cost = [1,3,5]
Output: 9
```

## Approach

Use dynamic programming. For each position in `source`, try matching all possible substrings from `original`. If a match is found and the corresponding `changed` string fits at the same position in `target`, consider the cost. Use DP to find the minimum cost to convert source[0..i].

## C# Solution

```csharp
public class Solution
{
    public long MinimumCost(string source, string target, string[] original, string[] changed, int[] cost)
    {
        int n = source.Length;
        var dp = new long[n + 1];
        const long INF = long.MaxValue / 2;

        for (int i = 1; i <= n; i++)
        {
            dp[i] = INF;
        }
        dp[0] = 0;

        for (int i = 0; i < n; i++)
        {
            if (dp[i] >= INF) continue;

            // Try not changing (must match)
            if (source[i] == target[i])
            {
                dp[i + 1] = Math.Min(dp[i + 1], dp[i]);
            }

            // Try all conversions
            for (int j = 0; j < original.Length; j++)
            {
                int len = original[j].Length;
                if (i + len <= n && 
                    source.Substring(i, len) == original[j] && 
                    target.Substring(i, len) == changed[j])
                {
                    dp[i + len] = Math.Min(dp[i + len], dp[i] + cost[j]);
                }
            }
        }

        return dp[n] >= INF ? -1 : dp[n];
    }
}
```

## Complexity

- **Time:** O(n * m * maxLen) where m = number of conversions
- **Space:** O(n)
