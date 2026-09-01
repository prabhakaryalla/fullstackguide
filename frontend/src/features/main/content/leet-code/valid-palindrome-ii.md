# 680. Valid Palindrome II

**Difficulty:** Easy
**Category:** Two Pointers, String, Greedy

## Problem

Given a string `s`, return `true` if it can become a palindrome after deleting at most one character.

### Example

```
Input: s = "abca"
Output: true
Explanation: Delete "c" to get "aba".
```

### Constraints

- `1 <= s.length <= 10^5`

## Approach

Use two pointers moving inward from both ends. As long as characters match, keep moving inward. The first time a mismatch occurs, at most one deletion is allowed, so check whether skipping the left character or skipping the right character (whichever restores a palindrome for the remaining substring) makes the rest a valid palindrome.

## C# Solution

```csharp
public class Solution
{
    public bool ValidPalindrome(string s)
    {
        int left = 0, right = s.Length - 1;

        while (left < right)
        {
            if (s[left] != s[right])
                return IsPalindrome(s, left + 1, right) || IsPalindrome(s, left, right - 1);

            left++;
            right--;
        }

        return true;
    }

    private bool IsPalindrome(string s, int left, int right)
    {
        while (left < right)
        {
            if (s[left] != s[right]) return false;
            left++;
            right--;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
