# 2901. Longest Unequal Adjacent Groups Subsequence II

**Difficulty:** Medium
**Category:** Array, String, Dynamic Programming, Greedy

## Problem

You are given a string array `words`, an array `groups` where `groups[i]` is the group `words[i]` belongs to, and an integer array `nums` representing the length of each word.

Select a subsequence of `words` such that:
- For every adjacent pair in the subsequence, the corresponding groups are different
- The corresponding adjacent words differ by exactly one character (same length with exactly one character different)

Return the longest such subsequence. If multiple answers exist, return the lexicographically smallest one.

### Example

```
Input: words = ["bab","dab","cab"], groups = [1,2,2]
Output: ["bab","dab"]
Explanation: A valid subsequence is ["bab","dab"] because groups[0] != groups[1]
and "bab" and "dab" differ by exactly one character.
```

## Approach

Use dynamic programming where `dp[i]` represents the longest valid subsequence ending at index `i`. For each position, check all previous positions and verify:
1. Groups are different
2. Words have the same length
3. Words differ by exactly one character

Track the actual subsequence path to reconstruct the answer. Among all maximum-length subsequences, choose the lexicographically smallest.

## C# Solution

```csharp
public class Solution
{
    public IList<string> GetLongestSubsequence(string[] words, int[] groups)
    {
        int n = words.Length;
        int[] dp = new int[n];
        int[] parent = new int[n];
        
        for (int i = 0; i < n; i++)
        {
            dp[i] = 1;
            parent[i] = -1;
        }
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (groups[j] != groups[i] && 
                    words[j].Length == words[i].Length && 
                    DifferByOne(words[j], words[i]))
                {
                    if (dp[j] + 1 > dp[i])
                    {
                        dp[i] = dp[j] + 1;
                        parent[i] = j;
                    }
                }
            }
        }
        
        int maxLen = dp.Max();
        int endIndex = -1;
        
        for (int i = 0; i < n; i++)
        {
            if (dp[i] == maxLen)
            {
                if (endIndex == -1 || IsLexSmaller(i, endIndex, parent, words))
                {
                    endIndex = i;
                }
            }
        }
        
        var result = new List<string>();
        int idx = endIndex;
        while (idx != -1)
        {
            result.Add(words[idx]);
            idx = parent[idx];
        }
        
        result.Reverse();
        return result;
    }
    
    private bool DifferByOne(string a, string b)
    {
        int diff = 0;
        for (int i = 0; i < a.Length; i++)
        {
            if (a[i] != b[i]) diff++;
            if (diff > 1) return false;
        }
        return diff == 1;
    }
    
    private bool IsLexSmaller(int i, int j, int[] parent, string[] words)
    {
        var pathI = GetPath(i, parent, words);
        var pathJ = GetPath(j, parent, words);
        
        for (int k = 0; k < pathI.Count && k < pathJ.Count; k++)
        {
            int cmp = string.Compare(pathI[k], pathJ[k]);
            if (cmp != 0) return cmp < 0;
        }
        return false;
    }
    
    private List<string> GetPath(int idx, int[] parent, string[] words)
    {
        var path = new List<string>();
        while (idx != -1)
        {
            path.Add(words[idx]);
            idx = parent[idx];
        }
        path.Reverse();
        return path;
    }
}
```

## Complexity

- **Time:** O(n² × m) where n is the number of words and m is the average word length
- **Space:** O(n)
