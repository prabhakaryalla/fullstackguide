# 583. Delete Operation for Two Strings

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Given two strings `word1` and `word2`, return the minimum number of steps required to make `word1` and `word2` the same, where in one step you can delete exactly one character from either string.

### Example

```
Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: Delete "s" from "sea" and "t" from "eat" to get "ea" for both.
```

### Constraints

- `1 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of only lowercase English letters.

## Approach

The characters that remain after all deletions must form the longest common subsequence (LCS) of the two strings — keeping any more would make it impossible to match, and keeping any fewer wastes deletions. Compute the LCS length using standard string DP, then the number of deletions needed is each string's length minus that shared LCS length, summed across both strings.

## C# Solution

```csharp
public class Solution
{
    public int MinDistance(string word1, string word2)
    {
        int n1 = word1.Length, n2 = word2.Length;
        var dp = new int[n1 + 1, n2 + 1];

        for (int i = 1; i <= n1; i++)
        {
            for (int j = 1; j <= n2; j++)
            {
                if (word1[i - 1] == word2[j - 1])
                    dp[i, j] = dp[i - 1, j - 1] + 1;
                else
                    dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }

        int lcs = dp[n1, n2];
        return (n1 - lcs) + (n2 - lcs);
    }
}
```

## Complexity

- **Time:** `O(n1 * n2)`.
- **Space:** `O(n1 * n2)` for the DP table.
