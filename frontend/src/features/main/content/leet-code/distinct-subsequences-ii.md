# 940. Distinct Subsequences II

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given a string `s`, return the number of distinct non-empty subsequences of `s`, modulo `10^9 + 7`.

### Example

```
Input: s = "abc"
Output: 7
```

## Approach

Let `dp[i]` be the number of distinct subsequences using the first `i` characters. Each new character doubles the count (append it to every previous subsequence, plus itself alone): `dp[i] = 2 * dp[i-1]`. But this double-counts subsequences that were already producible by an earlier occurrence of the same character, so subtract `dp[last[c] - 1]`, where `last[c]` is the previous position of that character.

## C# Solution

```csharp
public class Solution
{
    public int DistinctSubseqII(string s)
    {
        const int MOD = 1_000_000_007;
        var last = new int[26];
        Array.Fill(last, -1);

        var dp = new long[s.Length + 1];
        dp[0] = 1;

        for (int i = 1; i <= s.Length; i++)
        {
            dp[i] = dp[i - 1] * 2 % MOD;
            int c = s[i - 1] - 'a';

            if (last[c] != -1) dp[i] = (dp[i] - dp[last[c] - 1] + MOD) % MOD;
            last[c] = i;
        }

        return (int)((dp[s.Length] - 1 + MOD) % MOD);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
