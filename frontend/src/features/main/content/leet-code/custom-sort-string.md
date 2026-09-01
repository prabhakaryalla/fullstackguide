# 791. Custom Sort String

**Difficulty:** Medium
**Category:** Hash Table, String, Sorting

## Problem

Given a string `order` (a permutation of some lowercase letters, each unique) and a string `s`, sort the characters of `s` so that they appear in the same relative order as they do in `order`; characters not present in `order` may be placed anywhere at the end.

### Example

```
Input: order = "cba", s = "abcd"
Output: "cbad"
```

## Approach

Build a priority lookup array mapping each letter in `order` to its position; letters absent from `order` naturally default to `0` (equivalent, since ties among such letters don't matter, though sorting is still stable relative to comparator return values). Sort the characters of `s` using this priority as the comparison key.

## C# Solution

```csharp
public class Solution
{
    public string CustomSortString(string order, string s)
    {
        var priority = new int[26];
        for (int i = 0; i < order.Length; i++)
            priority[order[i] - 'a'] = i;

        var chars = s.ToCharArray();
        Array.Sort(chars, (a, b) => priority[a - 'a'] - priority[b - 'a']);

        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n log n)`, where `n` is the length of `s`.
- **Space:** `O(n)` for the character array.
