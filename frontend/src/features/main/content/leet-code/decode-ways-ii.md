# 639. Decode Ways II

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

A message of digits can be decoded using the mapping `'1' -> 'A', ..., '9' -> 'I'`. Given a string `s` that may also contain `'*'` (a wildcard matching any digit `1`-`9`), return the number of ways to decode it, modulo `10^9 + 7`.

### Example

```
Input: s = "*"
Output: 9
```

### Constraints

- `1 <= s.length <= 10^5`
- `s[i]` is a digit or `'*'`.

## Approach

Use rolling dynamic programming similar to the original Decode Ways, tracking `prev1` (ways to decode up through the previous character) and `prev2` (up through two characters back). For each new character, count how many single-digit decodings it represents (accounting for `'*'` matching 9 possibilities, or 0 if it's a literal `'0'`), and how many two-digit decodings the previous-and-current pair represents (handling all combinations of literal digits and wildcards that form a valid `10`-`26` code).

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int NumDecodings(string s)
    {
        long prev2 = 1;
        long prev1 = WaysForOne(s[0]);

        for (int i = 1; i < s.Length; i++)
        {
            long current = (WaysForOne(s[i]) * prev1) % Mod;
            current = (current + WaysForTwo(s[i - 1], s[i]) * prev2) % Mod;

            prev2 = prev1;
            prev1 = current;
        }

        return (int)prev1;
    }

    private long WaysForOne(char c)
    {
        if (c == '*') return 9;
        if (c == '0') return 0;
        return 1;
    }

    private long WaysForTwo(char first, char second)
    {
        if (first == '*' && second == '*') return 15;

        if (first == '*')
            return second <= '6' ? 2 : 1;

        if (second == '*')
        {
            if (first == '1') return 9;
            if (first == '2') return 6;
            return 0;
        }

        int value = (first - '0') * 10 + (second - '0');
        return value >= 10 && value <= 26 ? 1 : 0;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
