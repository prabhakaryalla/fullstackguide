# 926. Flip String to Monotone Increasing

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Given a binary string `s`, return the minimum number of character flips needed so that the string becomes monotone increasing (some prefix of `0`s followed by a suffix of `1`s).

### Example

```
Input: s = "00110"
Output: 1
```

## Approach

Scan left to right tracking `ones`, the number of `1`s seen so far, and `flips`, the minimum flips needed to make the prefix processed so far monotone. On a `'1'`, increment `ones`. On a `'0'`, either flip this `0` to a `1` (cost `flips + 1`) or flip all prior `1`s to `0`s (cost `ones`) — take the cheaper option.

## C# Solution

```csharp
public class Solution
{
    public int MinFlipsMonoIncr(string s)
    {
        int ones = 0, flips = 0;

        foreach (var c in s)
        {
            if (c == '1') ones++;
            else flips = Math.Min(flips + 1, ones);
        }

        return flips;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
