# 2825. Make String a Subsequence Using Cyclic Increments

**Difficulty:** Medium
**Category:** Two Pointers, String

## Problem

You are given two 0-indexed strings str1 and str2. In one operation, you can select a character in str1 and cyclically increment it to the next character in the alphabet. For example, 'a' becomes 'b', 'b' becomes 'c', and 'z' becomes 'a'.

Return true if you can make str2 a subsequence of str1 by performing zero or more operations, otherwise return false.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

### Example

```
Input: str1 = "abc", str2 = "ad"
Output: true
Explanation: Select 'c' in str1 and increment it to 'd'. Now str1 = "abd" and str2 = "ad" is a subsequence.
```

## Approach

We use a two-pointer approach to check if str2 can be formed as a subsequence of str1 with cyclic increments.

For each character in str2, we search forward in str1 to find a character that either:
1. Matches the character directly, or
2. Can be cyclically incremented once to match the character (i.e., the next character in the alphabet)

If we can match all characters of str2, return true. Otherwise, return false.

## C# Solution

```csharp
public class Solution
{
    public bool CanMakeSubsequence(string str1, string str2)
    {
        int i = 0; // pointer for str1
        int j = 0; // pointer for str2
        
        while (i < str1.Length && j < str2.Length)
        {
            char current = str1[i];
            char next = current == 'z' ? 'a' : (char)(current + 1);
            
            if (str1[i] == str2[j] || next == str2[j])
            {
                j++;
            }
            
            i++;
        }
        
        return j == str2.Length;
    }
}
```

## Complexity

- **Time:** O(n + m) where n is the length of str1 and m is the length of str2
- **Space:** O(1) for auxiliary space
