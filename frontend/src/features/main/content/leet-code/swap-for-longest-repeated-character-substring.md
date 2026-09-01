# 1156. Swap For Longest Repeated Character Substring

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a string `text`, you may swap two characters at most once. Return the length of the longest substring of a single repeated character achievable after at most one swap.

### Example

```
Input: text = "ababa"
Output: 3
```

## Approach

Break the string into runs of consecutive identical characters. For each run, if that character also occurs somewhere outside the run, one extra character can be swapped in, extending the run by one (capped by the character's total count in the string). Additionally, if a run of length `1` of a *different* character separates two runs of the *same* character, that single character can be swapped away, merging the two same-character runs (again capped by total count plus one extra if more of that character exists elsewhere).

## C# Solution

```csharp
public class Solution
{
    public int MaxRepOpt1(string text)
    {
        int n = text.Length;
        var groups = new List<(char ch, int length)>();

        int i = 0;
        while (i < n)
        {
            int j = i;
            while (j < n && text[j] == text[i]) j++;
            groups.Add((text[i], j - i));
            i = j;
        }

        int[] totalCount = new int[26];
        foreach (char c in text) totalCount[c - 'a']++;

        int result = 0;

        for (int g = 0; g < groups.Count; g++)
        {
            var (ch, length) = groups[g];
            int extra = totalCount[ch - 'a'] > length ? 1 : 0;
            result = Math.Max(result, Math.Min(length + extra, totalCount[ch - 'a']));

            if (g + 2 < groups.Count && groups[g + 1].length == 1 &&
                groups[g + 1].ch != ch && groups[g + 2].ch == ch)
            {
                int combined = length + groups[g + 2].length;
                int extra2 = totalCount[ch - 'a'] > combined ? 1 : 0;
                result = Math.Max(result, Math.Min(combined + extra2, totalCount[ch - 'a']));
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the run-length groups.
