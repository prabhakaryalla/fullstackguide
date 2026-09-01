# 2423. Remove Letter To Equalize Frequency

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

You are given a 0-indexed string `word`, consisting of lowercase English letters. You need to select one index and remove the letter at that index from `word` so that the frequency of every letter present in `word` is equal.

Return `true` if it is possible to remove one letter so that the frequency of all letters in `word` are equal, and `false` otherwise.

### Example

```
Input: word = "abcc"
Output: true
Explanation: Select index 3 and remove it: word becomes "abc" and each character has a frequency of 1.
```

## Approach

Try removing each character one at a time and check if all remaining characters have equal frequency. This brute force approach works well given the constraint that the string length is at most 100.

## C# Solution

```csharp
public class Solution
{
    public bool EqualFrequency(string word)
    {
        for (int i = 0; i < word.Length; i++)
        {
            string modified = word.Substring(0, i) + word.Substring(i + 1);
            
            if (HasEqualFrequency(modified))
            {
                return true;
            }
        }
        
        return false;
    }
    
    private bool HasEqualFrequency(string s)
    {
        if (s.Length == 0) return true;
        
        Dictionary<char, int> freq = new Dictionary<char, int>();
        
        foreach (char c in s)
        {
            if (!freq.ContainsKey(c))
                freq[c] = 0;
            freq[c]++;
        }
        
        int targetFreq = freq.First().Value;
        
        foreach (var kvp in freq)
        {
            if (kvp.Value != targetFreq)
                return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n^2) where n is the length of the string
- **Space:** O(n) for the frequency map
