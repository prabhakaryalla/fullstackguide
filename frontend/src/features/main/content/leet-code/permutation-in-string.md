# 567. Permutation in String

**Difficulty:** Medium
**Category:** Hash Table, Two Pointers, String, Sliding Window

## Problem

Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1` as a contiguous substring.

### Example

```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: "ba" is a permutation of "ab" and is a substring of s2.
```

### Constraints

- `1 <= s1.length, s2.length <= 10^4`
- `s1` and `s2` consist of lowercase English letters.

## Approach

Maintain a fixed-size sliding window over `s2` of length `s1.Length`, tracking character counts within the window. Slide the window one character at a time (adding the new character, removing the one that fell out of range), and compare the window's 26-letter count array against `s1`'s; a match means the current window is a permutation of `s1`.

## C# Solution

```csharp
public class Solution
{
    public bool CheckInclusion(string s1, string s2)
    {
        if (s1.Length > s2.Length) return false;

        var need = new int[26];
        var window = new int[26];

        foreach (var c in s1) need[c - 'a']++;

        for (int i = 0; i < s2.Length; i++)
        {
            window[s2[i] - 'a']++;

            if (i >= s1.Length)
                window[s2[i - s1.Length] - 'a']--;

            if (i >= s1.Length - 1 && Matches(need, window))
                return true;
        }

        return false;
    }

    private bool Matches(int[] need, int[] window)
    {
        for (int i = 0; i < 26; i++)
            if (need[i] != window[i]) return false;

        return true;
    }
}
```

## Complexity

- **Time:** `O(26 * n)`, effectively `O(n)`.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
