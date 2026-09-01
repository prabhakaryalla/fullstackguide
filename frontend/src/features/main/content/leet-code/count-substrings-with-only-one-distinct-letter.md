# 1180. Count Substrings with Only One Distinct Letter

**Difficulty:** Easy
**Category:** Math, String

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a string `s`, return the number of substrings that consist of only one distinct letter.

### Example

```
Input: s = "aaaba"
Output: 8
```

## Approach

Break the string into maximal runs of identical characters. A run of length `L` contributes `L * (L + 1) / 2` valid single-letter substrings (every contiguous slice within that run), so summing this formula over all runs gives the total count.

## C# Solution

```csharp
public class Solution
{
    public int CountLetters(string s)
    {
        int total = 0, runLength = 1;

        for (int i = 1; i <= s.Length; i++)
        {
            if (i < s.Length && s[i] == s[i - 1])
            {
                runLength++;
            }
            else
            {
                total += runLength * (runLength + 1) / 2;
                runLength = 1;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
