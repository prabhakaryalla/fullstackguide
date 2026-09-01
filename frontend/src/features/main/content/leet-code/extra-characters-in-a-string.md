# 2707. Extra Characters in a String

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Dynamic Programming, Trie

## Problem

You are given a string `s` and an array of strings `dictionary`. You need to break `s` into one or more non-overlapping substrings such that each substring is present in `dictionary`. There may be some extra characters in `s` which are not part of any of the substrings.

Return the minimum number of extra characters left over if you break up `s` optimally.

### Example

```
Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
Output: 1
Explanation: We can break s as "leet" (from dictionary) + "s" (extra) + "code" (from dictionary).
The minimum extra characters is 1.

Input: s = "sayhelloworld", dictionary = ["hello","world"]
Output: 3
Explanation: We can break s as "say" (extra) + "hello" + "world".
```

## Approach

Use dynamic programming where `dp[i]` represents the minimum number of extra characters in the substring `s[0...i-1]`.

For each position `i`, we have two choices:
1. Consider `s[i-1]` as an extra character: `dp[i] = dp[i-1] + 1`
2. Try to match a word from the dictionary ending at position `i`: for each word in the dictionary, if it matches `s[j...i-1]`, then `dp[i] = min(dp[i], dp[j])`

## C# Solution

```csharp
public class Solution 
{
    public int MinExtraChar(string s, string[] dictionary) 
    {
        int n = s.Length;
        var wordSet = new HashSet<string>(dictionary);
        int[] dp = new int[n + 1];
        
        for (int i = 1; i <= n; i++)
        {
            dp[i] = dp[i - 1] + 1;
            
            for (int j = 0; j < i; j++)
            {
                string substring = s.Substring(j, i - j);
                if (wordSet.Contains(substring))
                {
                    dp[i] = Math.Min(dp[i], dp[j]);
                }
            }
        }
        
        return dp[n];
    }
}
```

## Complexity

- **Time:** O(n³) where n is the length of s (O(n²) substrings, each taking O(n) to extract and check)
- **Space:** O(n + m) where m is the total length of all words in dictionary
