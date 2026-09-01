# 3368. First Letter Capitalization

**Difficulty:** Easy
**Category:** String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a sentence `s` made of words separated by single spaces, capitalize the first letter of every word and make every other letter lowercase. Return the resulting sentence.

### Example

Input: `s = "hello WORLD from LEETcode"`

Output: `"Hello World From Leetcode"`

## Approach
Split the sentence on spaces, and for each non-empty word, uppercase its first character and lowercase the rest, then rejoin the words with single spaces.

## C# Solution

```csharp
public class Solution 
{
    public string CapitalizeFirstLetter(string s) 
    {
        var words = s.Split(' ');
        for (int i = 0; i < words.Length; i++) 
        {
            if (words[i].Length == 0) continue;
            words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1).ToLower();
        }
        return string.Join(" ", words);
    }
}
```

## Complexity

- **Time:** O(n) where `n` is the length of `s`.
- **Space:** O(n)
