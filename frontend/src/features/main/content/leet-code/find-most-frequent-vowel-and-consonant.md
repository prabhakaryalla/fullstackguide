# 3541. Find Most Frequent Vowel and Consonant

**Difficulty:** Easy
**Category:** String, Hash Table, Counting

## Problem

You are given a string `s` consisting of lowercase English letters (`'a'` to `'z'`). Return the sum of the maximum frequency of any vowel (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`) in `s` and the maximum frequency of any consonant in `s`. If there are no vowels (or no consonants) in the string, treat that maximum frequency as `0`.

### Example

`s = "banana"`. Letter counts: `b=1, a=3, n=2`. The most frequent vowel is `a` with frequency `3`. The most frequent consonant is `n` with frequency `2`. The answer is `3 + 2 = 5`.

## Approach

Count the frequency of every letter using a fixed-size array of length 26. Then scan the 26 letters, tracking the maximum frequency among vowels and the maximum frequency among consonants separately, and return their sum.

## C# Solution

```csharp
public class Solution 
{
    public int MaxFreqSum(string s) 
    {
        int[] freq = new int[26];
        foreach (char c in s)
        {
            freq[c - 'a']++;
        }

        HashSet<char> vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int maxVowel = 0, maxConsonant = 0;

        for (int i = 0; i < 26; i++)
        {
            char c = (char)('a' + i);
            if (vowels.Contains(c))
            {
                maxVowel = Math.Max(maxVowel, freq[i]);
            }
            else
            {
                maxConsonant = Math.Max(maxConsonant, freq[i]);
            }
        }

        return maxVowel + maxConsonant;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
