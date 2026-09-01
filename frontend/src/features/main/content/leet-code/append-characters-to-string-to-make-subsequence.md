# 2486. Append Characters to String to Make Subsequence

**Difficulty:** Medium
**Category:** Two Pointers, String, Greedy

## Problem

You are given two strings `s` and `t` consisting only of lowercase English letters.

Return the minimum number of characters that need to be appended to the end of `s` so that `t` becomes a subsequence of `s`.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

### Example

```
Input: s = "coaching", t = "coding"
Output: 4
Explanation: Append "ding" to s so that t becomes a subsequence.

Input: s = "abcde", t = "a"
Output: 0
Explanation: t is already a subsequence of s.
```

## Approach

Use two pointers to find how many characters of `t` are already present in `s` as a subsequence. Start from the beginning of both strings and match characters greedily.

The number of unmatched characters in `t` is the answer - those need to be appended to `s`.

## C# Solution

```csharp
public class Solution
{
    public int AppendCharacters(string s, string t)
    {
        int i = 0, j = 0;
        
        while (i < s.Length && j < t.Length)
        {
            if (s[i] == t[j])
            {
                j++;
            }
            i++;
        }
        
        return t.Length - j;
    }
}
```

## Complexity

- **Time:** O(n + m) where n is the length of s and m is the length of t
- **Space:** O(1)
