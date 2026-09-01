# 1410. HTML Entity Parser

**Difficulty:** Medium
**Category:** String, Hash Table

## Problem

HTML entity parsers convert entities like `&quot;`, `&apos;`, `&amp;`, `&gt;`, `&lt;`, and `&frasl;` back into `"`, `'`, `&`, `>`, `<`, and `/` respectively. Given a string `text`, return the text after replacing all such entities.

### Example

```
Input: text = "and I quote: &quot;...&quot;"
Output: "and I quote: \"...\""
```

## Approach

Scan the text left to right. Whenever an `&` is found, try matching each of the six known entity strings starting at that position, preferring the longest match (this correctly resolves overlaps such as `&amp;quot;`, where only the `&amp;` should be consumed, leaving `quot;` as literal text). Append the decoded character and advance past the matched entity; otherwise, copy the character as-is.

## C# Solution

```csharp
public class Solution
{
    private static readonly Dictionary<string, char> Entities = new()
    {
        ["&quot;"] = '"',
        ["&apos;"] = '\'',
        ["&amp;"] = '&',
        ["&gt;"] = '>',
        ["&lt;"] = '<',
        ["&frasl;"] = '/',
    };

    public string EntityParser(string text)
    {
        var sb = new StringBuilder();
        int i = 0;
        int n = text.Length;

        while (i < n)
        {
            if (text[i] == '&')
            {
                string bestMatch = null;
                foreach (var entity in Entities.Keys)
                {
                    if (entity.Length <= n - i &&
                        string.CompareOrdinal(text, i, entity, 0, entity.Length) == 0 &&
                        (bestMatch == null || entity.Length > bestMatch.Length))
                    {
                        bestMatch = entity;
                    }
                }

                if (bestMatch != null)
                {
                    sb.Append(Entities[bestMatch]);
                    i += bestMatch.Length;
                    continue;
                }
            }

            sb.Append(text[i]);
            i++;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n * k)` where `k` is the fixed number of entity patterns (6).
- **Space:** `O(n)` for the output string.
