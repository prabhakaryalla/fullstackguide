# 409. Longest Palindrome

**Difficulty:** Easy
**Category:** Hash Table, String, Greedy

## Problem

Given a string `s` consisting of uppercase and lowercase letters, return the length of the longest palindrome that can be built with those letters (case-sensitive).

### Example

```
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome is "dccaccd", of length 7.
```

### Constraints

- `1 <= s.length <= 2000`
- `s` consists of lowercase and/or uppercase English letters only.

## Approach

Count occurrences of every character. Each character can contribute its count rounded down to the nearest even number to the palindrome (used as mirrored pairs), and at most one character with a leftover odd count can be placed in the exact center.

## C# Solution

```csharp
public class Solution
{
    public int LongestPalindrome(string s)
    {
        var counts = new int[128];
        foreach (var c in s) counts[c]++;

        int length = 0;
        bool hasOdd = false;

        foreach (var count in counts)
        {
            length += count / 2 * 2;
            if (count % 2 == 1) hasOdd = true;
        }

        return hasOdd ? length + 1 : length;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — bounded by the fixed ASCII character range.
