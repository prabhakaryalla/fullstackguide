# 2767. Partition String Into Minimum Beautiful Substrings

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Backtracking

## Problem

Given a binary string `s`, partition it into the minimum number of substrings such that each substring represents a power of 5 in decimal form and has no leading zeros.

Return the minimum number of such partitions, or -1 if it's impossible.

### Example

```
Input: s = "1011"
Output: 2
Explanation: "1011" can be split into "101" (5 in decimal) and "1" (1 = 5^0).
```

## Approach

Use dynamic programming where `dp[i]` represents the minimum number of beautiful substrings needed to partition `s[0...i-1]`. Pre-compute all powers of 5 up to the maximum possible value that can fit in the string length.

For each position i, try all possible previous positions j where s[j...i-1] forms a power of 5 without leading zeros. Update dp[i] = min(dp[i], dp[j] + 1).

## C# Solution

```csharp
public class Solution
{
    public int MinimumBeautifulSubstrings(string s)
    {
        var powersOf5 = new HashSet<string>();
        long power = 1;
        while (power <= (1L << 15))
        {
            powersOf5.Add(Convert.ToString(power, 2));
            power *= 5;
        }
        
        int n = s.Length;
        int[] dp = new int[n + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;
        
        for (int i = 1; i <= n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                string sub = s.Substring(j, i - j);
                
                if (sub[0] != '0' && powersOf5.Contains(sub) && dp[j] != int.MaxValue)
                {
                    dp[i] = Math.Min(dp[i], dp[j] + 1);
                }
            }
        }
        
        return dp[n] == int.MaxValue ? -1 : dp[n];
    }
}
```

## Complexity

- **Time:** O(n² * m) where n is string length and m is the length of largest substring checked
- **Space:** O(n + k) where k is the number of powers of 5 stored
