# 1639. Number of Ways to Form a Target String Given a Dictionary

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming

## Problem

Given a list of equal-length `words` and a `target` string, you build `target` by picking characters column by column: for each character of `target`, choose some word and some column index (each column index across all words may be used at most once overall, and must be used in increasing order). Return the number of ways to build `target`, modulo `10^9 + 7`.

### Example

```
Input: words = ["acca","bbbb","caca"], target = "aba"
Output: 6
```

## Approach

Precompute `count[j][c]`: how many words have character `c` at column `j`. Let `dp[i][j]` be the number of ways to form the first `i` characters of `target` using only columns `< j`. Either skip column `j - 1` entirely (`dp[i][j-1]`), or use it to supply `target[i-1]` (`dp[i-1][j-1] * count[j-1][target[i-1]]`).

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int NumWays(string[] words, string target)
    {
        int wordLength = words[0].Length;
        int targetLength = target.Length;
        int[,] count = new int[wordLength, 26];

        foreach (string word in words)
        {
            for (int j = 0; j < wordLength; j++)
            {
                count[j, word[j] - 'a']++;
            }
        }

        long[,] dp = new long[targetLength + 1, wordLength + 1];
        for (int j = 0; j <= wordLength; j++)
        {
            dp[0, j] = 1;
        }

        for (int i = 1; i <= targetLength; i++)
        {
            for (int j = 1; j <= wordLength; j++)
            {
                dp[i, j] = dp[i, j - 1];
                dp[i, j] = (dp[i, j] + dp[i - 1, j - 1] * count[j - 1, target[i - 1] - 'a']) % Mod;
            }
        }

        return (int)dp[targetLength, wordLength];
    }
}
```

## Complexity

- **Time:** `O(wordLength * targetLength)`.
- **Space:** `O(wordLength * targetLength)`.
