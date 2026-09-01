# 1758. Minimum Changes To Make Alternating Binary String

**Difficulty:** Easy
**Category:** String, Greedy

## Problem

Given a binary string `s`, return the minimum number of character changes needed so that no two adjacent characters are equal.

### Example

```
Input: s = "0100"
Output: 1
```

## Approach

An alternating string must match one of exactly two patterns: starting with `'0'` or starting with `'1'`. Count mismatches against the pattern that starts with `'0'`; the mismatch count against the pattern starting with `'1'` is simply the string length minus that count. The answer is the smaller of the two.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(string s)
    {
        int n = s.Length;
        int mismatchesStartingWithZero = 0;

        for (int i = 0; i < n; i++)
        {
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s[i] != expected) mismatchesStartingWithZero++;
        }

        return Math.Min(mismatchesStartingWithZero, n - mismatchesStartingWithZero);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
