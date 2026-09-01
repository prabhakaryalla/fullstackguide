# 68. Text Justification

**Difficulty:** Hard
**Category:** Array, String, Simulation

## Problem

Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully justified (both left and right). Pack as many words as possible in each line, distributing extra spaces as evenly as possible between words (more spaces go to the earlier gaps when they can't be split evenly). The last line should be left-justified with no extra spaces between words.

### Example 1

```
Input: words = ["This","is","an","example","of","text","justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

### Example 2

```
Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
```

### Constraints

- `1 <= words.length <= 300`
- `1 <= words[i].length <= 20`
- `words[i]` consists of only English letters and symbols.
- `1 <= maxWidth <= 100`
- `words[i].length <= maxWidth`

## Approach

Greedily pack words onto a line while their total length plus one minimum space per gap still fits within `maxWidth`. Once a line's words are chosen, distribute the remaining spaces: if there's only one word, pad on the right; otherwise, divide the extra spaces evenly across gaps, giving the leftover remainder to the leftmost gaps first. The final line is a special case — single-space-separated and left-justified with trailing padding.

## C# Solution

```csharp
public class Solution
{
    public IList<string> FullJustify(string[] words, int maxWidth)
    {
        var result = new List<string>();
        int index = 0;

        while (index < words.Length)
        {
            int lineLength = words[index].Length;
            int last = index + 1;

            while (last < words.Length && lineLength + 1 + words[last].Length <= maxWidth)
            {
                lineLength += 1 + words[last].Length;
                last++;
            }

            int wordCount = last - index;
            var sb = new StringBuilder();

            if (last == words.Length || wordCount == 1)
            {
                // last line, or single-word line: left-justify
                for (int i = index; i < last; i++)
                {
                    if (i > index) sb.Append(' ');
                    sb.Append(words[i]);
                }
                sb.Append(' ', maxWidth - sb.Length);
            }
            else
            {
                int totalChars = 0;
                for (int i = index; i < last; i++) totalChars += words[i].Length;

                int totalSpaces = maxWidth - totalChars;
                int gaps = wordCount - 1;
                int spacePerGap = totalSpaces / gaps;
                int extra = totalSpaces % gaps;

                for (int i = index; i < last - 1; i++)
                {
                    sb.Append(words[i]);
                    int spaces = spacePerGap + (i - index < extra ? 1 : 0);
                    sb.Append(' ', spaces);
                }
                sb.Append(words[last - 1]);
            }

            result.Add(sb.ToString());
            index = last;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each word and character is processed a constant number of times overall.
- **Space:** `O(1)` extra, excluding the output lines.
