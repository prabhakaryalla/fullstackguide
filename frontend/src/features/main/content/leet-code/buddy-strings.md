# 859. Buddy Strings

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given two strings `s` and `goal`, return `true` if you can swap exactly two characters in `s` (at different positions) to make it equal to `goal`.

### Example

```
Input: s = "ab", goal = "ba"
Output: true
```

## Approach

If `s` and `goal` are already identical, a valid swap is still possible only if some character repeats in `s` (swapping two identical characters is a no-op that keeps the strings equal). Otherwise, find all positions where `s` and `goal` differ; a valid single swap exists only if there are exactly two such positions and swapping the characters at those two positions in `s` produces `goal`.

## C# Solution

```csharp
public class Solution
{
    public bool BuddyStrings(string s, string goal)
    {
        if (s.Length != goal.Length) return false;

        if (s == goal)
        {
            var seen = new HashSet<char>(s);
            return seen.Count < s.Length;
        }

        var diffs = new List<int>();

        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] != goal[i]) diffs.Add(i);
        }

        if (diffs.Count != 2) return false;

        return s[diffs[0]] == goal[diffs[1]] && s[diffs[1]] == goal[diffs[0]];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the character set / diff list.
