# 3760. Maximum Substrings With Distinct Start

**Difficulty:** Medium
**Category:** Hash Table, String

## Problem

Given a string `s` of lowercase English letters, return the maximum number of substrings `s` can be split into such that each substring starts with a distinct character (no two substrings share a starting character).

### Example

Input: `s = "abab"`
Output: `2`

Split into `"a"` and `"bab"`; the starting characters `'a'` and `'b'` are distinct.

## Approach

Since a split's substrings' starting characters must all be distinct, the maximum number of parts equals the number of distinct characters present in `s` (one substring can start at the first occurrence of each distinct character).

## C# Solution

```csharp
public class Solution 
{
    public int MaxSubstrings(string s) 
    {
        var seen = new HashSet<char>();
        foreach (char c in s) seen.Add(c);
        return seen.Count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) (at most 26 distinct letters)
