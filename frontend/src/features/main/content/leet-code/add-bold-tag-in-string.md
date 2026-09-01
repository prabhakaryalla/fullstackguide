# 616. Add Bold Tag in String

**Difficulty:** Medium
**Category:** Array, Hash Table, String, String Matching, Trie
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` and an array of strings `words`, wrap every substring of `s` that matches any word in `words` with `<b>` and `</b>` tags, merging overlapping or adjacent bolded regions into a single pair of tags.

### Example

```
Input: s = "abcxyz123", words = ["abc","123"]
Output: "<b>abc</b>xyz<b>123</b>"
```

### Constraints

- `1 <= s.length <= 500`
- `1 <= words.length <= 100`

## Approach

Mark every character position covered by any matching word occurrence in a boolean array, by scanning for all occurrences of each word within `s` (including overlapping ones). Then build the output by scanning positions left to right: open a `<b>` tag right before a position transitions from unmarked to marked, and close it right after a position transitions from marked to unmarked — this automatically merges adjacent or overlapping bolded regions into single tag pairs.

## C# Solution

```csharp
public class Solution
{
    public string AddBoldTag(string s, string[] words)
    {
        int n = s.Length;
        var bold = new bool[n];

        foreach (var word in words)
        {
            int index = s.IndexOf(word, 0);
            while (index != -1)
            {
                for (int i = index; i < index + word.Length; i++)
                    bold[i] = true;

                index = s.IndexOf(word, index + 1);
            }
        }

        var sb = new StringBuilder();
        for (int i = 0; i < n; i++)
        {
            if (bold[i] && (i == 0 || !bold[i - 1]))
                sb.Append("<b>");

            sb.Append(s[i]);

            if (bold[i] && (i == n - 1 || !bold[i + 1]))
                sb.Append("</b>");
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n * words.Length * avgWordLength)`.
- **Space:** `O(n)` for the bold marker array.
