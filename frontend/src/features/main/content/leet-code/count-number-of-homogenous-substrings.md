# 1759. Count Number of Homogenous Substrings

**Difficulty:** Medium
**Category:** String, Math, Counting

## Problem

Given a string `s`, return the number of homogenous substrings of `s` (substrings consisting of a single repeated character), modulo `10^9 + 7`.

### Example

```
Input: s = "abbcccaa"
Output: 13
```

## Approach

Scan the string tracking the length of the current run of identical characters. Every time the run extends by one character, it creates exactly that many new homogenous substrings ending at the current position (of lengths `1` through the run length), so add the current run length to a running total at each step.

## C# Solution

```csharp
public class Solution
{
    public int CountHomogenous(string s)
    {
        const int Mod = 1_000_000_007;
        long result = 0;
        long runLength = 0;
        char prev = '\0';

        foreach (char c in s)
        {
            runLength = (c == prev) ? runLength + 1 : 1;
            prev = c;
            result = (result + runLength) % Mod;
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
