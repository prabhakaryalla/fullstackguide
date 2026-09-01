# 166. Fraction to Recurring Decimal

**Difficulty:** Medium
**Category:** Hash Table, Math, String

## Problem

Given two integers representing the numerator and denominator of a fraction, return the fraction as a string in decimal form. If the decimal part repeats, enclose the repeating part in parentheses.

### Example

```
numerator = 1, denominator = 2 -> "0.5"
numerator = 2, denominator = 1 -> "2"
numerator = 4, denominator = 333 -> "0.(012)"
```

## Approach

Handle the sign and integer part first using integer division. For the fractional part, repeatedly multiply the remainder by 10 and divide by the denominator to get the next digit, tracking each remainder's position in the output string using a dictionary. If a remainder repeats, the decimal has started cycling — insert `'('` at the position that remainder was first seen and close with `')'` at the end.

## C# Solution

```csharp
public class Solution
{
    public string FractionToDecimal(int numerator, int denominator)
    {
        if (numerator == 0) return "0";

        var sb = new StringBuilder();
        if ((numerator < 0) != (denominator < 0)) sb.Append('-');

        long num = Math.Abs((long)numerator);
        long den = Math.Abs((long)denominator);

        sb.Append(num / den);
        long remainder = num % den;
        if (remainder == 0) return sb.ToString();

        sb.Append('.');
        var remainderPositions = new Dictionary<long, int>();

        while (remainder != 0)
        {
            if (remainderPositions.TryGetValue(remainder, out int pos))
            {
                sb.Insert(pos, "(");
                sb.Append(')');
                break;
            }

            remainderPositions[remainder] = sb.Length;
            remainder *= 10;
            sb.Append(remainder / den);
            remainder %= den;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(den)` — bounded by the number of distinct remainders possible (at most `denominator` values).
- **Space:** `O(den)` — for the remainder-position dictionary.
