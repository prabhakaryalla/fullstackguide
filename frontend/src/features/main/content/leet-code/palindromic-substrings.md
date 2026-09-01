# 647. Palindromic Substrings

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Given a string `s`, return the number of palindromic substrings it contains (counting different positions as different substrings even if the characters are the same).

### Example

```
Input: s = "aaa"
Output: 6
```

### Constraints

- `1 <= s.length <= 1000`

## Approach

Use the "expand around center" technique: every palindrome is centered either on a single character (odd length) or between two characters (even length), giving `2n - 1` possible centers. For each center, expand outward symmetrically while the characters on both sides match, counting a new palindrome at every successful expansion.

## C# Solution

```csharp
public class Solution
{
    public int CountSubstrings(string s)
    {
        int n = s.Length;
        int count = 0;

        for (int center = 0; center < 2 * n - 1; center++)
        {
            int left = center / 2;
            int right = left + center % 2;

            while (left >= 0 && right < n && s[left] == s[right])
            {
                count++;
                left--;
                right++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` extra.
