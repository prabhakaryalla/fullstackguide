# 1446. Consecutive Characters

**Difficulty:** Easy
**Category:** String

## Problem

The "power" of a string is the length of its longest run of a single repeated character. Given a string `s`, return its power.

### Example

```
Input: s = "abbcccddddeeeeedcba"
Output: 5
```

## Approach

Scan the string while tracking the length of the current run of identical characters. Whenever the current character differs from the previous one, reset the run length to `1`; otherwise extend it. Track the maximum run length seen.

## C# Solution

```csharp
public class Solution
{
    public int MaxPower(string s)
    {
        int best = 1, current = 1;

        for (int i = 1; i < s.Length; i++)
        {
            current = s[i] == s[i - 1] ? current + 1 : 1;
            best = Math.Max(best, current);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
