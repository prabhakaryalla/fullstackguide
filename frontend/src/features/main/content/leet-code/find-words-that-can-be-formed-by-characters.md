# 1160. Find Words That Can Be Formed by Characters

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given an array of `words` and a string `chars`, a word is "good" if it can be formed using the letters of `chars` (each letter can only be used as many times as it appears in `chars`, and no letters from other words are shared). Return the sum of the lengths of all good words.

### Example

```
Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
```

## Approach

Count the available occurrences of each letter in `chars`. For every word, count its own required letter occurrences and check that none of them exceeds what's available; if the word passes, add its length to the running total.

## C# Solution

```csharp
public class Solution
{
    public int CountCharacters(string[] words, string chars)
    {
        int[] available = new int[26];
        foreach (char c in chars) available[c - 'a']++;

        int total = 0;

        foreach (var word in words)
        {
            int[] needed = new int[26];
            foreach (char c in word) needed[c - 'a']++;

            bool canForm = true;
            for (int i = 0; i < 26; i++)
            {
                if (needed[i] > available[i])
                {
                    canForm = false;
                    break;
                }
            }

            if (canForm) total += word.Length;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(total characters across all words + chars.Length)`.
- **Space:** `O(1)` (fixed-size 26-letter arrays).
