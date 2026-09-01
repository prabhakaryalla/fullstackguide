# 3775. Reverse Words With Same Vowel Count

**Difficulty:** Medium
**Category:** Two Pointers, String, Simulation

## Problem

Given a string `s` of lowercase words separated by single spaces, count the vowels in the first word. Reverse every subsequent word that has the same vowel count as the first word; leave all other words unchanged. Return the resulting string.

### Example

Input: `s = "cat and mice"`
Output: `"cat dna mice"`

`"cat"` has 1 vowel; `"and"` also has 1 vowel so it is reversed to `"dna"`; `"mice"` has 2 vowels so it is unchanged.

## Approach

Split `s` by spaces, count vowels in the first word, then for each remaining word count its vowels and reverse it if the count matches. Join the words back with single spaces.

## C# Solution

```csharp
public class Solution 
{
    public string ReverseWords(string s) 
    {
        string[] words = s.Split(' ');
        int targetCount = CountVowels(words[0]);
        for (int i = 1; i < words.Length; i++)
        {
            if (CountVowels(words[i]) == targetCount)
            {
                char[] arr = words[i].ToCharArray();
                Array.Reverse(arr);
                words[i] = new string(arr);
            }
        }
        return string.Join(" ", words);
    }

    private int CountVowels(string word)
    {
        int count = 0;
        foreach (char c in word)
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') count++;
        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
