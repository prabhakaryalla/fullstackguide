# 1859. Sorting the Sentence

**Difficulty:** Easy
**Category:** String, Sorting

## Problem

A sentence has each word suffixed with its 1-indexed original position. Given the shuffled sentence, reconstruct and return the original sentence.

### Example

```
Input: s = "is2 sentence4 This1 a3"
Output: "This is a sentence"
```

## Approach

Split the string on spaces. For each token, the last character is its digit position; place the token (with that digit stripped) into a result array at the corresponding 0-indexed slot, then join the array with spaces.

## C# Solution

```csharp
public class Solution
{
    public string SortSentence(string s)
    {
        var words = s.Split(' ');
        var ordered = new string[words.Length];

        foreach (var word in words)
        {
            int pos = word[^1] - '0';
            ordered[pos - 1] = word.Substring(0, word.Length - 1);
        }

        return string.Join(' ', ordered);
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the length of `s`.
- **Space:** `O(n)` for the split tokens and output array.
