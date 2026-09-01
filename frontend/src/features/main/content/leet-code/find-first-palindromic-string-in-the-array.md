# 2108. Find First Palindromic String in the Array

**Difficulty:** Easy
**Category:** Array, Two Pointers, String

## Problem

Given an array of strings `words`, return the first palindromic string in the array. If no such string exists, return an empty string.

### Example

```
Input: words = ["abc","car","ada","racecar","cool"]
Output: "ada"
Explanation: "ada" is the first palindrome.
```

## Approach

Iterate through the array and check each string for palindrome property using two pointers. Return the first one found, or empty string if none exist.

## C# Solution

```csharp
public class Solution
{
    public string FirstPalindrome(string[] words)
    {
        foreach (string word in words)
        {
            if (IsPalindrome(word))
                return word;
        }
        return "";
    }
    
    private bool IsPalindrome(string s)
    {
        int left = 0, right = s.Length - 1;
        while (left < right)
        {
            if (s[left] != s[right])
                return false;
            left++;
            right--;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is the number of words and m is the average length
- **Space:** O(1)
