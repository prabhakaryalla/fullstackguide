# 1324. Print Words Vertically

**Difficulty:** Medium
**Category:** Array, String, Simulation

## Problem

Given a string `s` of space-separated words, return a list of strings that print the words vertically, aligned by column, with trailing spaces trimmed from every row.

### Example

```
Input: s = "TO BE OR NOT TO BE"
Output: ["TBONTB","OEROTE","    B"]
```

## Approach

Split the sentence into words and determine the longest word length, which becomes the number of output rows. For each row index, walk through every word and append the character at that index (or a space if the word is too short), then trim trailing spaces from the assembled row.

## C# Solution

```csharp
public class Solution
{
    public IList<string> PrintVertically(string s)
    {
        var words = s.Split(' ');
        int maxLen = words.Max(w => w.Length);
        var result = new List<string>();

        for (int row = 0; row < maxLen; row++)
        {
            var sb = new System.Text.StringBuilder();
            foreach (var word in words)
            {
                sb.Append(row < word.Length ? word[row] : ' ');
            }
            result.Add(sb.ToString().TrimEnd());
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(words * maxLen)`.
- **Space:** `O(words * maxLen)` for the output rows.
