# 2301. Match Substring After Replacement

**Difficulty:** Hard
**Category:** String, Hash Table, Dynamic Programming

## Problem

You are given two strings `s` and `sub`, and a 2D character array `mappings` where `mappings[i] = [old_i, new_i]` indicates that you may replace any number of characters `old_i` in `sub` with `new_i` (this can be done any number of times).

Return `true` if it is possible to make `sub` a substring of `s` by replacing zero or more characters according to `mappings`. Otherwise, return `false`.

A substring is a contiguous non-empty sequence of characters within a string.

### Example

```
Input: s = "fool3e7bar", sub = "leet", mappings = [["e","3"],["t","7"],["t","8"]]
Output: true
Explanation: Replace "leet" → "l3e7" by replacing 'e' with '3' and 't' with '7'. "l3e7" is a substring of "fool3e7bar".
```

## Approach

For each starting position in `s`, we check if we can match `sub` by verifying each character can either directly match or be transformed according to the mappings. We preprocess the mappings into a set of allowed pairs for O(1) lookup.

## C# Solution

```csharp
public class Solution
{
    public bool MatchReplacement(string s, string sub, char[][] mappings)
    {
        var allowedMap = new HashSet<long>();
        foreach (var mapping in mappings)
        {
            allowedMap.Add(((long)mapping[0] << 16) | mapping[1]);
        }
        
        for (int i = 0; i <= s.Length - sub.Length; i++)
        {
            if (CanMatch(s, i, sub, allowedMap))
                return true;
        }
        return false;
    }
    
    private bool CanMatch(string s, int start, string sub, HashSet<long> allowed)
    {
        for (int j = 0; j < sub.Length; j++)
        {
            char sc = s[start + j];
            char subc = sub[j];
            if (sc != subc && !allowed.Contains(((long)subc << 16) | sc))
                return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n * m * k) where n is length of s, m is length of sub, k is mapping size
- **Space:** O(k) for the mapping set
