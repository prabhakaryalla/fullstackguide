# 2767. Number of Beautiful Partitions

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

You are given a string `s` that consists of the digits `'1'` to `'9'` and two integers `k` and `minLength`.

A partition of `s` is called beautiful if:
- `s` is partitioned into `k` non-intersecting substrings.
- Each substring has a length of at least `minLength`.
- Each substring starts with a prime digit and ends with a non-prime digit.

Return the number of beautiful partitions of `s`. Since the answer may be very large, return it modulo `10^9 + 7`.

A prime digit is `'2'`, `'3'`, `'5'`, or `'7'`. A non-prime digit is `'1'`, `'4'`, `'6'`, `'8'`, or `'9'`.

### Example

```
Input: s = "23542185131", k = 3, minLength = 2
Output: 3
Explanation: The beautiful partitions are: "2354|218|5131", "2354|21851|31", "2354|2185|131"
```

## Approach

Use dynamic programming where `dp[i][j]` represents the number of ways to partition the first `i` characters into `j` beautiful substrings. Check prime/non-prime conditions at partition boundaries.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int BeautifulPartitions(string s, int k, int minLength)
    {
        int n = s.Length;
        if (!IsPrime(s[0]) || IsPrime(s[n - 1]))
        {
            return 0;
        }
        
        var dp = new long[n + 1, k + 1];
        dp[0, 0] = 1;
        
        for (int i = minLength; i <= n; i++)
        {
            for (int j = 1; j <= k; j++)
            {
                if (IsPrime(s[i - 1])) continue;
                
                for (int prev = i - minLength; prev >= 0; prev--)
                {
                    if (prev == 0 || !IsPrime(s[prev - 1]))
                    {
                        if (prev == 0 || IsPrime(s[prev]))
                        {
                            dp[i, j] = (dp[i, j] + dp[prev, j - 1]) % MOD;
                        }
                    }
                }
            }
        }
        
        return (int)dp[n, k];
    }
    
    private bool IsPrime(char c)
    {
        return c == '2' || c == '3' || c == '5' || c == '7';
    }
}
```

## Complexity

- **Time:** O(n² × k)
- **Space:** O(n × k)
