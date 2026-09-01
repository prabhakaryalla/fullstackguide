# 1592. Rearrange Spaces Between Words

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `text` containing words separated by one or more spaces, rearrange the spaces so they are distributed as evenly as possible between the words, with any leftover spaces appended at the end.

### Example

```
Input: text = "  this   is  a sentence "
Output: "this   is   a   sentence"
```

## Approach

Count the total number of spaces and split the text into non-empty words. If there's only one word, all spaces go at the end. Otherwise, divide the total space count evenly among the gaps between words (`totalSpaces / (wordCount - 1)`), and place the leftover (`totalSpaces % (wordCount - 1)`) spaces at the very end.

## C# Solution

```csharp
public class Solution
{
    public string ReorderSpaces(string text)
    {
        int totalSpaces = text.Count(c => c == ' ');
        string[] words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        if (words.Length == 1)
        {
            return words[0] + new string(' ', totalSpaces);
        }

        int gaps = words.Length - 1;
        int spacesPerGap = totalSpaces / gaps;
        int extraSpaces = totalSpaces % gaps;

        string gapSpaces = new string(' ', spacesPerGap);
        string result = string.Join(gapSpaces, words);
        return result + new string(' ', extraSpaces);
    }
}
```

## Complexity

- **Time:** `O(n)` — splitting and rebuilding the string.
- **Space:** `O(n)` for the word array and result string.
