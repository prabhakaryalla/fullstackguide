# 2416. Length of the Longest Alphabetical Continuous Substring

**Difficulty:** Medium
**Category:** String

## Problem

An alphabetical continuous string is a string consisting of consecutive letters in the alphabet. In other words, it is any substring of the string `"abcdefghijklmnopqrstuvwxyz"`.

Given a string `s` consisting of lowercase letters only, return the length of the longest alphabetical continuous substring.

### Example

```
Input: s = "abacaba"
Output: 2
Explanation: There are 4 distinct continuous substrings: "a", "b", "c" and "ab".
"ab" is the longest continuous substring.
```

## Approach

Iterate through the string and maintain a counter for the current continuous substring length. If the current character is exactly one more than the previous character (in alphabetical order), increment the counter; otherwise reset it to 1. Track the maximum counter value seen.

## C# Solution

```csharp
public class Solution
{
    public int LongestContinuousSubstring(string s)
    {
        if (string.IsNullOrEmpty(s)) return 0;
        
        int maxLen = 1;
        int currentLen = 1;
        
        for (int i = 1; i < s.Length; i++)
        {
            if (s[i] == s[i - 1] + 1)
            {
                currentLen++;
                maxLen = Math.Max(maxLen, currentLen);
            }
            else
            {
                currentLen = 1;
            }
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(1)
