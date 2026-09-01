# 1332. Remove Palindromic Subsequences

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `s` containing only characters `'a'` and `'b'`, return the minimum number of steps to remove all characters, where each step removes a palindromic subsequence from the current string.

### Example

```
Input: s = "baabb"
Output: 2
```

## Approach

Since the string only contains two distinct letters, at most two steps are ever required: if `s` is empty, `0` steps are needed; if `s` is already a palindrome, `1` step removes it entirely; otherwise, removing every `'a'` (itself a palindromic subsequence) and then every `'b'` finishes the job in `2` steps.

## C# Solution

```csharp
public class Solution
{
    public int RemovePalindromeSub(string s)
    {
        if (s.Length == 0) return 0;

        int left = 0, right = s.Length - 1;
        while (left < right)
        {
            if (s[left] != s[right]) return 2;
            left++;
            right--;
        }

        return 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
