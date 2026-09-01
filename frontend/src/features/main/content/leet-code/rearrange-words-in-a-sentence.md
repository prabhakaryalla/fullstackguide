# 1451. Rearrange Words in a Sentence

**Difficulty:** Medium
**Category:** String, Sorting

## Problem

Given a sentence `text` (first letter capitalized, rest lowercase, single spaces between words), rearrange the words in increasing order of length, keeping words of the same length in their original relative order, and capitalize the first letter of the resulting sentence's first word.

### Example

```
Input: text = "Leetcode is cool"
Output: "Is cool leetcode"
```

## Approach

Split the sentence into words and lowercase the original first word (undoing its capitalization). Perform a stable sort by word length — .NET's `OrderBy` is stable, so equal-length words retain their original relative order. Finally, capitalize the first letter of the new first word and join everything back with single spaces.

## C# Solution

```csharp
public class Solution
{
    public string ArrangeWords(string text)
    {
        var words = text.Split(' ');
        words[0] = char.ToLower(words[0][0]) + words[0].Substring(1);

        var sorted = words.OrderBy(w => w.Length).ToArray();
        sorted[0] = char.ToUpper(sorted[0][0]) + sorted[0].Substring(1);

        return string.Join(" ", sorted);
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the stable sort by word length.
- **Space:** `O(n)` for the words array.
