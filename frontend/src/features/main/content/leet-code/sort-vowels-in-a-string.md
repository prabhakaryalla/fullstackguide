# 2785. Sort Vowels in a String

**Difficulty:** Medium
**Category:** String, Sorting

## Problem

You are given a 0-indexed string `s`. Rearrange only the vowel characters of `s` (uppercase and lowercase, both count) so that they appear in non-decreasing order of their ASCII values, while every consonant stays in its original position. Return the resulting string.

### Example

Input: s = "lEetcOde"
Output: "lEOtcede"
Explanation: The vowels 'E','e','O','e' (ASCII 69, 101, 79, 101) are sorted to 'E','O','e','e' and placed back into the original vowel positions.

## Approach

Extract all vowel characters from `s` in order, sort them by their character (ASCII) value, then walk through `s` again and replace each vowel position with the next smallest sorted vowel, leaving consonants untouched.

## C# Solution

```csharp
public class Solution 
{
    public string SortVowels(string s) 
    {
        var vowels = new HashSet<char> { 'a','e','i','o','u','A','E','I','O','U' };
        var chars = s.ToCharArray();
        var extracted = new List<char>();

        foreach (char c in chars) 
        {
            if (vowels.Contains(c)) extracted.Add(c);
        }

        extracted.Sort();

        int idx = 0;
        for (int i = 0; i < chars.Length; i++) 
        {
            if (vowels.Contains(chars[i])) 
            {
                chars[i] = extracted[idx++];
            }
        }

        return new string(chars);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
