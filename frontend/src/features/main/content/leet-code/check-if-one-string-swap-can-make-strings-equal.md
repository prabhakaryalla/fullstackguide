# 1790. Check if One String Swap Can Make Strings Equal

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

Given two strings `s1` and `s2` of equal length, return `true` if it is possible to make them equal by swapping exactly one pair of characters in exactly one of the strings (or if they are already equal).

### Example

```
Input: s1 = "bank", s2 = "kanb"
Output: true
```

## Approach

Find all positions where the two strings differ. If there are zero differences, the strings are already equal. If there are exactly two differing positions, a single swap can fix them only if the characters are "cross-matched" — `s1`'s character at the first differing index equals `s2`'s character at the second, and vice versa. Any other number of differences makes a single swap insufficient.

## C# Solution

```csharp
public class Solution
{
    public bool AreAlmostEqual(string s1, string s2)
    {
        var diffs = new List<int>();
        for (int i = 0; i < s1.Length; i++)
            if (s1[i] != s2[i]) diffs.Add(i);

        if (diffs.Count == 0) return true;
        if (diffs.Count != 2) return false;

        int a = diffs[0], b = diffs[1];
        return s1[a] == s2[b] && s1[b] == s2[a];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (at most two differing indices are tracked).
