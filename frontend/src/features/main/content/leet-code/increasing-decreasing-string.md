# 1370. Increasing Decreasing String

**Difficulty:** Easy
**Category:** String, Sorting, Counting

## Problem

Given a string `s`, repeatedly pick the smallest remaining character (appending it), then the next smallest, and so on to build an increasing run; then repeat picking the largest remaining, then the next largest, for a decreasing run; keep alternating until every character is used, and return the result.

### Example

```
Input: s = "aaaabbbbcccc"
Output: "abccbaabccba"
```

## Approach

Count the frequency of each letter. Repeatedly sweep the alphabet forward, appending one occurrence of each letter that still has remaining count, then sweep backward doing the same, decrementing counts as letters are used, until no letters remain.

## C# Solution

```csharp
public class Solution
{
    public string SortString(string s)
    {
        var count = new int[26];
        foreach (char c in s) count[c - 'a']++;

        var sb = new System.Text.StringBuilder();
        int remaining = s.Length;

        while (remaining > 0)
        {
            for (int i = 0; i < 26; i++)
            {
                if (count[i] > 0)
                {
                    sb.Append((char)('a' + i));
                    count[i]--;
                    remaining--;
                }
            }
            for (int i = 25; i >= 0; i--)
            {
                if (count[i] > 0)
                {
                    sb.Append((char)('a' + i));
                    count[i]--;
                    remaining--;
                }
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — fixed-size 26-letter counts.
