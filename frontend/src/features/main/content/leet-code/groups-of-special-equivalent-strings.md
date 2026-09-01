# 893. Groups of Special-Equivalent Strings

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting

## Problem

Two strings are "special-equivalent" if swapping any two characters at even indices, or any two characters at odd indices, any number of times, can transform one into the other. Given an array of strings `words` all of the same length, return the number of groups of special-equivalent strings.

### Example

```
Input: words = ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]
Output: 3
```

## Approach

Since only characters at the same parity of index can be freely rearranged relative to each other, a string's special-equivalence class is fully captured by the sorted multiset of its even-indexed characters combined with the sorted multiset of its odd-indexed characters. Compute this canonical signature for every word and count the number of distinct signatures using a hash set.

## C# Solution

```csharp
public class Solution
{
    public int NumSpecialEquivGroups(string[] words)
    {
        var signatures = new HashSet<string>();

        foreach (var word in words)
        {
            var evens = new List<char>();
            var odds = new List<char>();

            for (int i = 0; i < word.Length; i++)
            {
                if (i % 2 == 0) evens.Add(word[i]);
                else odds.Add(word[i]);
            }

            evens.Sort();
            odds.Sort();

            signatures.Add(new string(evens.ToArray()) + "|" + new string(odds.ToArray()));
        }

        return signatures.Count;
    }
}
```

## Complexity

- **Time:** `O(n * L log L)`.
- **Space:** `O(n * L)` for the signatures set.
