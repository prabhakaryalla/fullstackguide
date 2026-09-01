# 763. Partition Labels

**Difficulty:** Medium
**Category:** Hash Table, Two Pointers, String, Greedy

## Problem

Given a string `s`, partition it into as many parts as possible so that each letter appears in at most one part, and return a list of the lengths of these parts.

### Example

```
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,4,3,1,1]
```

## Approach

First record the last occurrence index of every letter. Then scan through the string while tracking the furthest "end" boundary needed so far, extending it to the last occurrence of each newly seen character. When the current index reaches this boundary, a valid partition ends there — no character in the current segment reappears later — so record its length and start a new segment.

## C# Solution

```csharp
public class Solution
{
    public IList<int> PartitionLabels(string s)
    {
        var lastIndex = new int[26];
        for (int i = 0; i < s.Length; i++)
            lastIndex[s[i] - 'a'] = i;

        var result = new List<int>();
        int start = 0, end = 0;

        for (int i = 0; i < s.Length; i++)
        {
            end = Math.Max(end, lastIndex[s[i] - 'a']);

            if (i == end)
            {
                result.Add(end - start + 1);
                start = i + 1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
