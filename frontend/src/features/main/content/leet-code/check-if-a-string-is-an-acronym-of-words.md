# 2828. Check if a String Is an Acronym of Words

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given an array of strings words and a string s, determine if s is an acronym of words.

The string s is considered an acronym of words if it can be formed by concatenating the first character of each string in words in order. For example, "ab" can be formed from ["apple", "banana"], but it cannot be formed from ["bear", "aardvark"].

Return true if s is an acronym of words, and false otherwise.

### Example

```
Input: words = ["alice","bob","charlie"], s = "abc"
Output: true
Explanation: The first characters are 'a', 'b', 'c', forming "abc"
```

## Approach

This is a straightforward string matching problem. We simply iterate through the words array and check if:
1. The length of s equals the length of words
2. Each character in s matches the first character of the corresponding word in words

If both conditions are satisfied, return true; otherwise, return false.

## C# Solution

```csharp
public class Solution
{
    public bool IsAcronym(List<string> words, string s)
    {
        if (words.Count != s.Length)
            return false;
        
        for (int i = 0; i < words.Count; i++)
        {
            if (words[i][0] != s[i])
                return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of words
- **Space:** O(1) for auxiliary space
