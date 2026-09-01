# 1864. Minimum Number of Swaps to Make the Binary String Alternating

**Difficulty:** Medium
**Category:** String, Two Pointers, Greedy

## Problem

Given a binary string `s`, return the minimum number of character swaps (any two positions) needed to make it alternating (no two adjacent characters equal), or `-1` if impossible.

### Example

```
Input: s = "111000"
Output: 1
```

## Approach

Count the zeros and ones. If their difference exceeds `1`, no alternating arrangement is possible. If the counts are equal, two alternating patterns are candidates (starting with `'0'` or starting with `'1'`); otherwise, only the pattern starting with the majority character is valid. For a target pattern, count how many positions mismatch the expected alternating character — since swapping any mismatched `'0'`-expected-but-`'1'`-found position with a mismatched `'1'`-expected-but-`'0'`-found position fixes two mismatches per swap, the answer is `mismatches / 2`.

## C# Solution

```csharp
public class Solution
{
    public int MinSwaps(string s)
    {
        int ones = s.Count(c => c == '1');
        int zeros = s.Length - ones;

        if (Math.Abs(ones - zeros) > 1) return -1;

        if (ones == zeros) return Math.Min(CountSwaps(s, '0'), CountSwaps(s, '1'));

        return CountSwaps(s, ones > zeros ? '1' : '0');
    }

    private int CountSwaps(string s, char start)
    {
        int mismatches = 0;
        char expected = start;

        foreach (char c in s)
        {
            if (c != expected) mismatches++;
            expected = expected == '0' ? '1' : '0';
        }

        return mismatches / 2;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
