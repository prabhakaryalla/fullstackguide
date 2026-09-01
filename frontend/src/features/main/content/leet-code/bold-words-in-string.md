# 758. Bold Words in String

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Trie, String Matching
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of keyword `words` and a string `s`, wrap every substring of `s` that matches any word in `words` with `<b>` and `</b>` tags, merging overlapping or adjacent bold regions into a single tag pair.

### Example

```
Input: words = ["ab","bc"], s = "aabcd"
Output: "a<b>abc</b>d"
```

## Approach

Mark a boolean array indicating which character positions in `s` should be bold, by finding every occurrence of every word (via repeated `IndexOf` scans) and flagging the matched range. Then build the result string in one pass: open a `<b>` tag whenever entering a bold region (a bold character preceded by a non-bold one) and close it whenever leaving one, naturally merging adjacent/overlapping matches since they share the same contiguous bold range.

## C# Solution

```csharp
public class Solution
{
    public string BoldWords(string[] words, string s)
    {
        int n = s.Length;
        var bold = new bool[n];

        foreach (var word in words)
        {
            int index = s.IndexOf(word);
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

- **Time:** `O(w * n)`, where `w` is the number of words.
- **Space:** `O(n)` for the bold marker array.
