# 1717. Maximum Score From Removing Substrings

**Difficulty:** Medium
**Category:** String, Greedy, Stack

## Problem

Given a string `s` and points `x`, `y`, repeatedly remove the substring `"ab"` (earning `x` points) or `"ba"` (earning `y` points). Return the maximum total points obtainable.

### Example

```
Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
```

## Approach

Always remove the higher-value pattern first across the whole string, then remove the remaining lower-value pattern from what's left. Both passes use a stack: scan left to right, and whenever the top of the stack together with the current character forms the target pattern, pop it and add the points instead of pushing the current character.

## C# Solution

```csharp
public class Solution
{
    public int MaximumGain(string s, int x, int y)
    {
        char hi = x >= y ? 'a' : 'b';
        char lo = hi == 'a' ? 'b' : 'a';
        int hiPoints = Math.Max(x, y);
        int loPoints = Math.Min(x, y);

        var (remaining, score1) = RemovePairs(s, hi, lo, hiPoints);
        var (_, score2) = RemovePairs(remaining, lo, hi, loPoints);
        return score1 + score2;
    }

    private (string, int) RemovePairs(string s, char first, char second, int points)
    {
        var stack = new List<char>();
        int score = 0;

        foreach (char c in s)
        {
            if (stack.Count > 0 && stack[^1] == first && c == second)
            {
                stack.RemoveAt(stack.Count - 1);
                score += points;
            }
            else
            {
                stack.Add(c);
            }
        }

        return (new string(stack.ToArray()), score);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
