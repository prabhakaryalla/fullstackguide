# 1297. Maximum Number of Occurrences of a Substring

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

Given a string `s` and integers `maxLetters`, `minSize`, and `maxSize`, return the maximum number of times any substring of `s` occurs, restricted to substrings whose length is between `minSize` and `maxSize` and that contain at most `maxLetters` distinct characters.

### Example

```
Input: s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
Output: 2
```

## Approach

A key simplification: any substring longer than `minSize` occurs at most as often as one of its length-`minSize` prefixes, so only substrings of exactly length `minSize` ever need to be checked — longer valid windows can't beat the best `minSize` window's frequency. Slide a window of length `minSize` across `s`, and for each window that has at most `maxLetters` distinct characters, record its occurrence in a frequency map. The answer is the maximum frequency recorded.

## C# Solution

```csharp
public class Solution
{
    public int MaxFreq(string s, int maxLetters, int minSize, int maxSize)
    {
        var freq = new Dictionary<string, int>();
        int best = 0;

        for (int i = 0; i + minSize <= s.Length; i++)
        {
            string sub = s.Substring(i, minSize);

            if (CountDistinct(sub) <= maxLetters)
            {
                freq[sub] = freq.GetValueOrDefault(sub) + 1;
                best = Math.Max(best, freq[sub]);
            }
        }

        return best;
    }

    private int CountDistinct(string s)
    {
        var seen = new HashSet<char>();
        foreach (char c in s) seen.Add(c);
        return seen.Count;
    }
}
```

## Complexity

- **Time:** `O(n * minSize)`, where `n` is the length of `s`.
- **Space:** `O(n)` for the frequency map.
