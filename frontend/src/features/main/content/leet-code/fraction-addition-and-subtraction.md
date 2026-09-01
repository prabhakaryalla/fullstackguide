# 592. Fraction Addition and Subtraction

**Difficulty:** Medium
**Category:** Math, String, Simulation

## Problem

Given a string `expression` representing an expression of fraction addition and subtraction, return the calculation result in irreducible fraction form.

### Example

```
Input: expression = "-1/2+1/2+1/3"
Output: "1/3"
```

### Constraints

- The input string only contains `'0'` to `'9'`, `'/'`, `'+'`, and `'-'`.
- The result is guaranteed to fit in a 32-bit integer.

## Approach

Parse the expression into individual signed fractions by scanning character by character (tracking an optional leading sign, the numerator digits, the `/` separator, and the denominator digits). Accumulate a running numerator/denominator pair by combining each fraction over a common denominator (multiplying across), reducing by the GCD after each step to keep the numbers small, and reduce the final result once more before formatting it.

## C# Solution

```csharp
public class Solution
{
    public string FractionAddition(string expression)
    {
        var fractions = ParseFractions(expression);

        long numerator = 0, denominator = 1;

        foreach (var (num, den) in fractions)
        {
            numerator = numerator * den + num * denominator;
            denominator *= den;

            long divisor = Gcd(Math.Abs(numerator), denominator);
            if (divisor > 0)
            {
                numerator /= divisor;
                denominator /= divisor;
            }
        }

        if (numerator == 0) return "0/1";

        return $"{numerator}/{denominator}";
    }

    private List<(long Num, long Den)> ParseFractions(string expression)
    {
        var result = new List<(long, long)>();
        int i = 0;

        while (i < expression.Length)
        {
            int sign = 1;
            if (expression[i] == '+' || expression[i] == '-')
            {
                sign = expression[i] == '-' ? -1 : 1;
                i++;
            }

            int numStart = i;
            while (char.IsDigit(expression[i])) i++;
            long numerator = sign * long.Parse(expression.Substring(numStart, i - numStart));

            i++;

            int denStart = i;
            while (i < expression.Length && char.IsDigit(expression[i])) i++;
            long denominator = long.Parse(expression.Substring(denStart, i - denStart));

            result.Add((numerator, denominator));
        }

        return result;
    }

    private long Gcd(long a, long b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the parsed fractions.
