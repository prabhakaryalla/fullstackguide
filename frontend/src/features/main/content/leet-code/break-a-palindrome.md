# 1328. Break a Palindrome

**Difficulty:** Medium
**Category:** Greedy, String

## Problem

Given a palindromic string `palindrome` of lowercase letters, replace exactly one character so the result is the lexicographically smallest string that is **not** a palindrome, or return an empty string if impossible.

### Example

```
Input: palindrome = "abccba"
Output: "aaccba"
```

## Approach

If the string has length `1`, no replacement can avoid a palindrome, so return an empty string. Otherwise scan the first half of the string for the first character that isn't `'a'` and replace it with `'a'`, which minimizes the string while breaking the symmetry. If every character in the first half is already `'a'`, the whole string is all `'a'`s (or forced into that shape), so instead replace the last character with `'b'`.

## C# Solution

```csharp
public class Solution
{
    public string BreakPalindrome(string palindrome)
    {
        int n = palindrome.Length;
        if (n == 1) return "";

        var chars = palindrome.ToCharArray();

        for (int i = 0; i < n / 2; i++)
        {
            if (chars[i] != 'a')
            {
                chars[i] = 'a';
                return new string(chars);
            }
        }

        chars[n - 1] = 'b';
        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the character array.
