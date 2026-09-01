# 438. Find All Anagrams in a String

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`.

### Example

```
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
```

### Constraints

- `1 <= s.length, p.length <= 3 * 10^4`
- `s` and `p` consist of lowercase English letters.

## Approach

Maintain a fixed-size sliding window of length `p.Length` over `s`, tracking character counts within the window alongside the required counts from `p`. As the window slides by one character each step (adding the new character, removing the one that fell out of range), compare the 26-length count arrays; a match means the current window is an anagram of `p`.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindAnagrams(string s, string p)
    {
        var result = new List<int>();
        if (s.Length < p.Length) return result;

        var need = new int[26];
        var window = new int[26];

        foreach (var c in p) need[c - 'a']++;

        for (int i = 0; i < s.Length; i++)
        {
            window[s[i] - 'a']++;

            if (i >= p.Length)
                window[s[i - p.Length] - 'a']--;

            if (i >= p.Length - 1 && Matches(need, window))
                result.Add(i - p.Length + 1);
        }

        return result;
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

- **Time:** `O(26n)`, effectively `O(n)`.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
