# 1374. Generate a String With Characters That Have Odd Counts

**Difficulty:** Easy
**Category:** String

## Problem

Given an integer `n`, return a string of length `n` using only lowercase letters such that every letter's count in the string is odd.

### Example

```
Input: n = 4
Output: "pppz"
```

## Approach

If `n` is odd, a string of `n` copies of a single letter already has an odd count for that letter. If `n` is even, use `n - 1` copies of one letter (odd count) plus a single copy of a different letter (count `1`, also odd).

## C# Solution

```csharp
public class Solution
{
    public string GenerateTheString(int n)
    {
        if (n % 2 == 1) return new string('a', n);
        return new string('a', n - 1) + 'b';
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output string.
