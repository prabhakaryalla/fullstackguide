# 2734. Lexicographically Smallest Palindrome

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

You are given a string `s` consisting of lowercase English letters. You can perform some operations on it where in one operation you can replace any character in `s` with another lowercase English letter.

Your task is to make `s` a palindrome with the minimum number of operations possible. If there are multiple palindromes that can be made using the minimum number of operations, return the lexicographically smallest one.

### Example

```
Input: s = "egcfe"
Output: "efcfe"
Explanation: Change 'g' to 'f' to make it a palindrome with minimal operations.

Input: s = "abcd"
Output: "abba"
Explanation: Change 'c' to 'b' and 'd' to 'a'.

Input: s = "seven"
Output: "neven"
Explanation: Change the first 's' to 'n'.
```

## Approach

Use two pointers from both ends of the string. For each pair of characters at positions i and n-1-i:
- If they're already equal, continue
- If they're different, replace both with the lexicographically smaller one

This ensures minimum operations and lexicographically smallest result.

## C# Solution

```csharp
public class Solution 
{
    public string MakeSmallestPalindrome(string s) 
    {
        char[] chars = s.ToCharArray();
        int left = 0;
        int right = chars.Length - 1;
        
        while (left < right)
        {
            if (chars[left] != chars[right])
            {
                char smaller = chars[left] < chars[right] ? chars[left] : chars[right];
                chars[left] = smaller;
                chars[right] = smaller;
            }
            left++;
            right--;
        }
        
        return new string(chars);
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the character array
