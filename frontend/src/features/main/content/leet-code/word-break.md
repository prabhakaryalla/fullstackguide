# 139. Word Break

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Dynamic Programming, Trie, Memoization

## Problem

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

### Example 1

```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: "leetcode" can be segmented as "leet code".
```

```mermaid
graph LR
    A["leet"] --- B["code"]
    style A fill:#4caf50,color:#fff
    style B fill:#4caf50,color:#fff
```

### Example 2

```
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

### Constraints

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`

## Approach

`dp[i]` means the prefix `s[0..i)` can be fully segmented using dictionary words. For each end position `i`, try every earlier split point `j`: if `dp[j]` is true and `s[j..i)` is a dictionary word, then `dp[i]` is true. `dp[0] = true` (the empty prefix trivially segments).

## C# Solution

```csharp
public class Solution
{
    public bool WordBreak(string s, IList<string> wordDict)
    {
        var dictionary = new HashSet<string>(wordDict);
        var dp = new bool[s.Length + 1];
        dp[0] = true;

        for (int i = 1; i <= s.Length; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (dp[j] && dictionary.Contains(s.Substring(j, i - j)))
                {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[s.Length];
    }
}
```

## Complexity

- **Time:** `O(n^2)` — nested loop over split points, with `O(1)` average dictionary lookups.
- **Space:** `O(n)` — for the DP array (plus the dictionary's own storage).
