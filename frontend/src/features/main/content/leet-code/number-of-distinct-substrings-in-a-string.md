# 1698. Number of Distinct Substrings in a String

**Difficulty:** Medium
**Category:** Hash Table, String, Suffix Array, Rolling Hash, Suffix Tree, String Matching

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s`, return the number of distinct substrings of `s` (including the empty result implicitly excluded, counting all non-empty contiguous substrings only once each regardless of how many times they occur).

### Example

```
Input: s = "aabbaba"
Output: 21
```

## Approach

Generate every substring (all start positions and lengths) and insert each into a hash set, which automatically deduplicates identical substrings; the final set size is the answer. This direct approach is simplest to reason about correctly, trading some efficiency for clarity (a suffix-array or rolling-hash approach would be needed for very large inputs).

## C# Solution

```csharp
public class Solution
{
    public int CountDistinct(string s)
    {
        HashSet<string> substrings = new HashSet<string>();
        int n = s.Length;

        for (int i = 0; i < n; i++)
        {
            for (int len = 1; i + len <= n; len++)
            {
                substrings.Add(s.Substring(i, len));
            }
        }

        return substrings.Count;
    }
}
```

## Complexity

- **Time:** `O(n^3)` in the worst case (substring generation and hashing).
- **Space:** `O(n^2)` for the stored substrings.
