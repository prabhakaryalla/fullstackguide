# 1416. Restore The Array

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given a digit string `s` and an integer `k`, count the number of ways to split `s` into a sequence of positive integers, each between `1` and `k` inclusive, with no number containing a leading zero. Return the count modulo `10^9 + 7`.

### Example

```
Input: s = "1000", k = 10000
Output: 1
```

## Approach

Let `dp[i]` be the number of ways to split the suffix `s[i:]`. Compute it from right to left: `dp[n] = 1` (empty suffix, one way — split nothing). For each starting index `i`, if `s[i]` is `'0'` there is no valid split (a number can't start with a leading zero), so `dp[i] = 0`. Otherwise, extend the current number digit by digit as long as its numeric value stays `<= k`, adding `dp[i + len]` for each valid length. Since `k <= 10^9`, at most 10 digits ever need to be tried per starting position.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfArrays(string s, int k)
    {
        const int MOD = 1_000_000_007;
        int n = s.Length;
        long[] dp = new long[n + 1];
        dp[n] = 1;

        int maxLen = k.ToString().Length;

        for (int i = n - 1; i >= 0; i--)
        {
            if (s[i] == '0') continue;

            long value = 0;
            for (int len = 1; len <= maxLen && i + len <= n; len++)
            {
                value = value * 10 + (s[i + len - 1] - '0');
                if (value > k) break;
                dp[i] = (dp[i] + dp[i + len]) % MOD;
            }
        }

        return (int)dp[0];
    }
}
```

## Complexity

- **Time:** `O(n * log k)` since each position tries at most `log10(k) + 1` lengths.
- **Space:** `O(n)` for the `dp` array.
