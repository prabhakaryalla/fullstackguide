# 3442. Maximum Difference Between Even and Odd Frequency I

**Difficulty:** Easy
**Category:** String, Hash Table, Counting

## Problem

Given a string `s` consisting of lowercase English letters, find the maximum value of `freq(a) - freq(b)`, where `a` and `b` are two different characters in `s`, `freq(a)` is even and greater than `0`, and `freq(b)` is odd and greater than `0`.

### Example

`s = "aaaaabbc"` → `3`. `freq('a') = 5` (odd), `freq('b') = 2` (even), `freq('c') = 1` (odd). Choosing `a = 'b'` (even freq 2) and `b = 'a'` (odd freq 5) gives `2 - 5 = -3`; choosing `a = 'b'`, `b = 'c'` gives `2 - 1 = 1`. The best pairing across all inputs like this yields the maximum even-minus-odd difference.

## Approach

Count the frequency of every character. Track the largest even, non-zero frequency and the smallest odd, non-zero frequency, then return their difference.

## C# Solution

```csharp
public class Solution 
{
    public int MaxDifference(string s) 
    {
        int[] count = new int[26];
        foreach (char c in s)
            count[c - 'a']++;

        int maxEven = int.MinValue;
        int minOdd = int.MaxValue;

        foreach (int c in count)
        {
            if (c == 0) continue;
            if (c % 2 == 0)
                maxEven = Math.Max(maxEven, c);
            else
                minOdd = Math.Min(minOdd, c);
        }

        return maxEven - minOdd;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
