# 3517. Smallest Palindromic Rearrangement I

**Difficulty:** Medium
**Category:** Hash Table, String, Greedy, Counting

## Problem

You are given a string `s` that is itself a palindrome. Return the lexicographically smallest palindrome that can be formed by rearranging the characters of `s`.

### Example

```
Input: s = "cbaabc"
Output: "abccba"
Explanation: The letter counts are a:2, b:2, c:2. Placing the sorted half "abc" followed by its
mirror "cba" gives the lexicographically smallest palindrome: "abccba".
```

## Approach

Count the frequency of each letter. Since `s` is a palindrome, at most one letter can have an odd count (that becomes the middle character for odd-length strings). Take half the count of every letter (in ascending alphabetical order) to build the smallest possible left half, place the odd-count letter (if any) in the middle, then mirror the left half to build the right half.

## C# Solution

```csharp
public class Solution 
{
    public string SmallestPalindrome(string s) 
    {
        var freq = new int[26];
        foreach (char c in s) freq[c - 'a']++;

        var half = new List<char>();
        char middle = '\0';
        bool hasMiddle = false;
        for (int i = 0; i < 26; i++)
        {
            if (freq[i] % 2 != 0)
            {
                middle = (char)('a' + i);
                hasMiddle = true;
            }
            for (int cnt = 0; cnt < freq[i] / 2; cnt++)
            {
                half.Add((char)('a' + i));
            }
        }

        var sb = new System.Text.StringBuilder();
        foreach (char c in half) sb.Append(c);
        if (hasMiddle) sb.Append(middle);
        for (int i = half.Count - 1; i >= 0; i--)
        {
            sb.Append(half[i]);
        }
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `s`.
- **Space:** O(n) for the resulting string.
