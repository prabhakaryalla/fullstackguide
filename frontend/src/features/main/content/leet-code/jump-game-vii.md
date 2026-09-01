# 1871. Jump Game VII

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Prefix Sum

## Problem

Given a binary string `s` and integers `minJump`, `maxJump`, starting at index `0` you may jump to index `i` from index `j` if `j` is reachable, `minJump <= i - j <= maxJump`, and `s[i] == '0'`. Return whether the last index is reachable.

### Example

```
Input: s = "011010", minJump = 2, maxJump = 3
Output: true
```

## Approach

Compute reachability `dp[i]` left to right: index `i` is reachable only if `s[i] == '0'` and at least one reachable index falls in the window `[i - maxJump, i - minJump]`. Maintain a prefix-sum array of `dp` so any window's reachable count can be queried in O(1), avoiding an O(maxJump) rescan per index.

## C# Solution

```csharp
public class Solution
{
    public bool CanReach(string s, int minJump, int maxJump)
    {
        int n = s.Length;
        var dp = new bool[n];
        dp[0] = true;
        var prefix = new int[n + 1];
        prefix[1] = 1;

        for (int i = 1; i < n; i++)
        {
            if (s[i] == '0')
            {
                int lo = Math.Max(0, i - maxJump);
                int hi = i - minJump;
                if (hi >= 0 && prefix[hi + 1] - prefix[lo] > 0)
                {
                    dp[i] = true;
                }
            }
            prefix[i + 1] = prefix[i] + (dp[i] ? 1 : 0);
        }

        return dp[n - 1];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the DP and prefix arrays.
