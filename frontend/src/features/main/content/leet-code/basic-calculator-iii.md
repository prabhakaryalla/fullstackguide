# 772. Basic Calculator III

**Difficulty:** Hard
**Category:** Math, String, Stack, Recursion
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Implement a basic calculator to evaluate a string expression that may contain integers, `+`, `-`, `*`, `/`, and nested parentheses, with standard operator precedence (no exponents, integer division truncates toward zero).

### Example

```
Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21
```

## Approach

Use a recursive-descent parser with three precedence levels: `ParseExpression` handles `+`/`-` by repeatedly combining terms, `ParseTerm` handles `*`/`/` by repeatedly combining factors, and `ParseFactor` handles parenthesized sub-expressions, unary `+`/`-`, and numeric literals. Each level calls into the next-higher-precedence level, naturally enforcing correct evaluation order, and parentheses simply recurse back into `ParseExpression`.

## C# Solution

```csharp
public class Solution
{
    public int Calculate(string s)
    {
        int pos = 0;
        return ParseExpression(s, ref pos);
    }

    private int ParseExpression(string s, ref int pos)
    {
        int result = ParseTerm(s, ref pos);

        while (pos < s.Length)
        {
            SkipSpaces(s, ref pos);
            if (pos >= s.Length || (s[pos] != '+' && s[pos] != '-')) break;

            char op = s[pos++];
            int term = ParseTerm(s, ref pos);
            result = op == '+' ? result + term : result - term;
        }

        return result;
    }

    private int ParseTerm(string s, ref int pos)
    {
        int result = ParseFactor(s, ref pos);

        while (true)
        {
            SkipSpaces(s, ref pos);
            if (pos >= s.Length || (s[pos] != '*' && s[pos] != '/')) break;

            char op = s[pos++];
            int factor = ParseFactor(s, ref pos);
            result = op == '*' ? result * factor : result / factor;
        }

        return result;
    }

    private int ParseFactor(string s, ref int pos)
    {
        SkipSpaces(s, ref pos);

        if (s[pos] == '(')
        {
            pos++;
            int value = ParseExpression(s, ref pos);
            SkipSpaces(s, ref pos);
            pos++;
            return value;
        }

        if (s[pos] == '-')
        {
            pos++;
            return -ParseFactor(s, ref pos);
        }

        if (s[pos] == '+')
        {
            pos++;
            return ParseFactor(s, ref pos);
        }

        int start = pos;
        while (pos < s.Length && char.IsDigit(s[pos])) pos++;
        return int.Parse(s.Substring(start, pos - start));
    }

    private void SkipSpaces(string s, ref int pos)
    {
        while (pos < s.Length && s[pos] == ' ') pos++;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the recursion stack.
