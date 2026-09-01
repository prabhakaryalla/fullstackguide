# 2370. Longest Ideal Subsequence

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

You are given a string `s` consisting of lowercase letters and an integer `k`. We call a string `t` ideal if the following conditions are satisfied:

- `t` is a subsequence of the string `s`.
- The absolute difference in the alphabet order of every two adjacent letters in `t` is less than or equal to `k`.

Return the length of the longest ideal string.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

### Example

```
Input: s = "acfgbd", k = 2
Output: 4
Explanation: "acbd" is an ideal subsequence
```

## Approach

Use dynamic programming with a state for each letter. For each character, update dp[char] by taking the maximum of dp values for all characters within distance k.

## C# Solution

```csharp
public class Solution
{
    public int LongestIdealString(string s, int k)
    {
        var dp = new int[26];
        
        foreach (char c in s)
        {
            int idx = c - 'a';
            int maxPrev = 0;
            
            for (int j = Math.Max(0, idx - k); j <= Math.Min(25, idx + k); j++)
            {
                maxPrev = Math.Max(maxPrev, dp[j]);
            }
            
            dp[idx] = maxPrev + 1;
        }
        
        return dp.Max();
    }
}
```

## Complexity

- **Time:** O(n * k) where n is length of s
- **Space:** O(1) since alphabet is fixed size
