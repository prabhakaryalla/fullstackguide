# 3750. Minimum Number of Flips to Reverse Binary String

**Difficulty:** Easy
**Category:** String, Two Pointers

## Problem

Given a binary string `s`, return the minimum number of single-character flips (changing a `'0'` to `'1'` or vice versa) needed so that the resulting string equals its own reverse (i.e., becomes a palindrome).

### Example

s = "1100" → comparing mirrored pairs (0,3)=('1','0') mismatch, (1,2)=('1','0') mismatch. Answer = 2.

## Approach

Use two pointers from both ends moving inward. For each mirrored pair `(s[i], s[n-1-i])`, if they differ, exactly one flip resolves that pair. Count the number of mismatched pairs.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumFlips(string s) 
    {
        int n = s.Length;
        int flips = 0;
        for (int i = 0, j = n - 1; i < j; i++, j--) 
        {
            if (s[i] != s[j]) flips++;
        }
        return flips;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
