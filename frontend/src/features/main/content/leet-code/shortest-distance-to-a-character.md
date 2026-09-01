# 821. Shortest Distance to a Character

**Difficulty:** Easy
**Category:** Array, Two Pointers, String

## Problem

Given a string `s` and a character `c` that occurs in `s`, return an array where each element is the shortest distance from that index to any occurrence of `c` in `s`.

### Example

```
Input: s = "loveleetcode", c = "e"
Output: [3,2,1,0,1,0,0,1,2,2,1,0]
```

## Approach

Perform two passes. In the first, scan left to right, tracking the most recent index where `c` occurred, and record the distance to it (or a very large distance if `c` hasn't appeared yet). In the second pass, scan right to left similarly, taking the minimum of the previously recorded distance and the distance to the nearest occurrence of `c` on the right.

## C# Solution

```csharp
public class Solution
{
    public int[] ShortestToChar(string s, char c)
    {
        int n = s.Length;
        var result = new int[n];
        int prev = int.MinValue / 2;

        for (int i = 0; i < n; i++)
        {
            if (s[i] == c) prev = i;
            result[i] = i - prev;
        }

        prev = int.MaxValue / 2;

        for (int i = n - 1; i >= 0; i--)
        {
            if (s[i] == c) prev = i;
            result[i] = Math.Min(result[i], prev - i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra, excluding the output array.
