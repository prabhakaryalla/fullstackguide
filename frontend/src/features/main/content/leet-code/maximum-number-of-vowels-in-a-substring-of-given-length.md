# 1456. Maximum Number of Vowels in a Substring of Given Length

**Difficulty:** Medium
**Category:** String, Sliding Window

## Problem

Given a string `s` and an integer `k`, return the maximum number of vowel letters (`a`, `e`, `i`, `o`, `u`) contained in any substring of `s` with length `k`.

### Example

```
Input: s = "abciiidef", k = 3
Output: 3
```

## Approach

Slide a window of size `k` across the string, maintaining a running vowel count: add a vowel when the incoming character is a vowel, and remove one when the character leaving the window (once the window exceeds size `k`) was a vowel. Track the maximum count once the window reaches its full size.

## C# Solution

```csharp
public class Solution
{
    private static readonly HashSet<char> Vowels = new() { 'a', 'e', 'i', 'o', 'u' };

    public int MaxVowels(string s, int k)
    {
        int count = 0, best = 0;

        for (int i = 0; i < s.Length; i++)
        {
            if (Vowels.Contains(s[i])) count++;
            if (i >= k && Vowels.Contains(s[i - k])) count--;
            if (i >= k - 1) best = Math.Max(best, count);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
