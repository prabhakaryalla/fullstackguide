# 2062. Count Vowel Substrings of a String

**Difficulty:** Easy
**Category:** String, Hash Table

## Problem

A substring is a **vowel substring** if it consists only of vowels (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`) and contains **all five** of them at least once. Given a string `word`, return *the number of vowel substrings in `word`*.

## Approach

Since `word.Length <= 100`, a direct double loop over all `O(n^2)` substrings is efficient enough. For each starting index, extend the substring one character at a time; stop extending as soon as a non-vowel character is encountered. While extending, track which of the five vowels have been seen (e.g., with a `HashSet<char>`); whenever all five are present, count that substring as valid.

## C# Solution

```csharp
public class Solution
{
    public int CountVowelSubstrings(string word)
    {
        var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int count = 0;
        int n = word.Length;

        for (int i = 0; i < n; i++)
        {
            var seen = new HashSet<char>();

            for (int j = i; j < n; j++)
            {
                if (!vowels.Contains(word[j])) break;

                seen.Add(word[j]);
                if (seen.Count == 5) count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` (the seen set holds at most 5 characters).
