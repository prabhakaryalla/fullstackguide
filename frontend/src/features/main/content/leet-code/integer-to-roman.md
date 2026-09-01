# 12. Integer to Roman

**Difficulty:** Medium
**Category:** Hash Table, Math, String

## Problem

Given an integer, convert it to a Roman numeral.

Roman numerals are represented by seven symbols: `I` (1), `V` (5), `X` (10), `L` (50), `C` (100), `D` (500), `M` (1000). Six combinations use subtraction (`IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900).

### Example 1

```
Input: num = 3749
Output: "MMMDCCXLIX"
Explanation: 3000 = MMM, 700 = DCC, 40 = XL, 9 = IX
```

### Example 2

```
Input: num = 58
Output: "LVIII"
Explanation: 50 = L, 8 = VIII
```

### Example 3

```
Input: num = 1994
Output: "MCMXCIV"
Explanation: 1000 = M, 900 = CM, 90 = XC, 4 = IV
```

### Constraints

- `1 <= num <= 3999`

## Approach

Greedily walk a table of value/symbol pairs ordered from largest to smallest (including the six subtractive combinations). For each pair, append the symbol and subtract the value from `num` as many times as it fits before moving to the next pair.

## C# Solution

```csharp
public class Solution
{
    private static readonly (int Value, string Symbol)[] Numerals =
    {
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
    };

    public string IntToRoman(int num)
    {
        var sb = new StringBuilder();

        foreach (var (value, symbol) in Numerals)
        {
            while (num >= value)
            {
                sb.Append(symbol);
                num -= value;
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by a fixed table of 13 symbols and `num <= 3999`.
- **Space:** `O(1)` — excluding the output string.
