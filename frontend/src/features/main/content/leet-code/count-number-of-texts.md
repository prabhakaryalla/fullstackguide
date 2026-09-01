# 2266. Count Number of Texts

**Difficulty:** Medium
**Category:** Hash Table, Math, String, Dynamic Programming

## Problem

Alice is texting Bob using her phone. The mapping of digits to letters is shown below (similar to a phone keypad). Note that digit 7 maps to "pqrs" and digit 9 maps to "wxyz".

A valid text is formed by pressing keys according to these rules:
- A digit can be pressed multiple times to represent different letters.
- To represent a single letter, press the key once or the required number of times.

Given a string `pressedKeys` representing the keys Alice pressed, return the total number of possible text messages she could have sent (modulo 10⁹ + 7).

### Example

```
Input: pressedKeys = "22233"
Output: 8
Explanation: Possible texts: "aaa", "aab", "aac", "abb", "abc", "baa", "bab", "bac".
```

## Approach

Use dynamic programming. For each position, consider how many consecutive identical digits can form valid letter sequences (1-3 for most keys, 1-4 for keys 7 and 9). Sum the ways to decode each valid prefix length.

## C# Solution

```csharp
public class Solution
{
    public int CountTexts(string pressedKeys)
    {
        const int MOD = 1_000_000_007;
        int n = pressedKeys.Length;
        long[] dp = new long[n + 1];
        dp[0] = 1;
        
        for (int i = 1; i <= n; i++)
        {
            int maxLen = (pressedKeys[i - 1] == '7' || pressedKeys[i - 1] == '9') ? 4 : 3;
            
            for (int len = 1; len <= Math.Min(i, maxLen); len++)
            {
                bool allSame = true;
                for (int j = 0; j < len - 1; j++)
                {
                    if (pressedKeys[i - 1 - j] != pressedKeys[i - 1 - j - 1])
                    {
                        allSame = false;
                        break;
                    }
                }
                
                if (allSame)
                {
                    dp[i] = (dp[i] + dp[i - len]) % MOD;
                }
                else
                {
                    break;
                }
            }
        }
        
        return (int)dp[n];
    }
}
```

## Complexity

- **Time:** O(n) with small constant factor.
- **Space:** O(n) for the DP array.
