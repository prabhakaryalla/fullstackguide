# 2900. Longest Unequal Adjacent Groups Subsequence I

**Difficulty:** Medium
**Category:** Array, String, Dynamic Programming, Greedy

## Problem

You are given a string array `words` and a binary array `groups` both of length `n`, where `words[i]` is associated with `groups[i]`.

Your task is to select the longest subsequence of indices `[i0, i1, ..., ik-1]` such that for every `j` where `0 < j < k`, `groups[ij-1] != groups[ij]`.

Return a string array containing the words corresponding to the selected indices in order.

### Example

```
Input: words = ["e","a","b"], groups = [0,0,1]
Output: ["e","b"]
Explanation:
A valid subsequence is [0,2] because groups[0] != groups[2].
The corresponding words are ["e","b"].
```

## Approach

Use a greedy approach: iterate through the arrays and select words where the group changes from the previous selection. Start with the first word, then for each subsequent word, add it to the result if its group differs from the last added word's group.

## C# Solution

```csharp
public class Solution
{
    public string[] GetLongestSubsequence(string[] words, int[] groups)
    {
        var result = new List<string>();
        result.Add(words[0]);
        int lastGroup = groups[0];
        
        for (int i = 1; i < words.Length; i++)
        {
            if (groups[i] != lastGroup)
            {
                result.Add(words[i]);
                lastGroup = groups[i];
            }
        }
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass through the arrays.
- **Space:** `O(n)` for the result in worst case.
