# 13. Roman to Integer

**Difficulty:** Easy
**Category:** Hash Table, Math, String

## Problem

Given a Roman numeral, convert it to an integer.

Roman numerals are represented by seven symbols: `I` (1), `V` (5), `X` (10), `L` (50), `C` (100), `D` (500), `M` (1000). When a smaller value precedes a larger one, it is subtracted (e.g. `IV` = 4).

### Example 1

```
Input: s = "III"
Output: 3
```

### Example 2

```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V = 5, III = 3.
```

### Example 3

```
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90, IV = 4.
```

### Constraints

- `1 <= s.length <= 15`
- `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
- It is guaranteed that `s` is a valid Roman numeral in the range `[1, 3999]`.

## Approach

Map each symbol to its value, then scan left to right. Whenever a symbol's value is smaller than the value that follows it, subtract it instead of adding it (this captures subtractive pairs like `IV`, `IX`, `XL`, etc.).

## C# Solution

```csharp
public class Solution
{
    private static readonly Dictionary<char, int> Values = new()
    {
        ['I'] = 1, ['V'] = 5, ['X'] = 10, ['L'] = 50,
        ['C'] = 100, ['D'] = 500, ['M'] = 1000,
    };

    public int RomanToInt(string s)
    {
        int total = 0;

        for (int i = 0; i < s.Length; i++)
        {
            int value = Values[s[i]];

            if (i + 1 < s.Length && value < Values[s[i + 1]])
            {
                total -= value;
            }
            else
            {
                total += value;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass over the string.
- **Space:** `O(1)` — the lookup table has a fixed size.
