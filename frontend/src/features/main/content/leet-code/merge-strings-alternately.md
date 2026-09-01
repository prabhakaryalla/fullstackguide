# 1768. Merge Strings Alternately

**Difficulty:** Easy
**Category:** String, Two Pointers

## Problem

Given two strings `word1` and `word2`, merge them by adding letters in alternating order, starting with `word1`. If one string is longer, append its remaining letters at the end.

### Example

```
Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
```

## Approach

Walk both strings with two pointers, appending one character from each in turn while both still have characters left, then append whatever remains of the longer string.

## C# Solution

```csharp
public class Solution
{
    public string MergeAlternately(string word1, string word2)
    {
        var sb = new System.Text.StringBuilder();
        int i = 0, j = 0;

        while (i < word1.Length || j < word2.Length)
        {
            if (i < word1.Length) sb.Append(word1[i++]);
            if (j < word2.Length) sb.Append(word2[j++]);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(m + n)`.
- **Space:** `O(m + n)` for the result.
