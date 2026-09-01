# 770. Basic Calculator IV

**Difficulty:** Hard
**Category:** Math, String, Stack, Recursion

## Problem

Given an `expression` string containing variables (lowercase letters), integers, the operators `+`, `-`, `*`, and parentheses, along with a list of variable-value assignments (`evalvars`, `evalints`), evaluate the expression symbolically (substituting known variable values) and return the result as a list of terms, sorted by degree descending (and lexicographically for ties), representing the simplified polynomial.

### Example

```
Input: expression = "e + 8 - a + 5", evalvars = ["e"], evalints = [1]
Output: ["-1*a","14"]
```

## Approach

Represent a polynomial as a dictionary mapping a canonical, sorted, `"*"`-joined string of variable factors (or an empty string for the constant term) to its integer coefficient. Parse the expression with a recursive-descent parser respecting `+`/`-` (lowest precedence), `*` (higher precedence), and parentheses; each factor is either a parenthesized sub-expression, a numeric literal, a known variable (substituted with its value), or an unknown variable (represented as a single-factor polynomial with coefficient 1). Combine sub-polynomials with `Add` (merge coefficients per factor-key, dropping zero terms) and `Multiply` (distribute every term of one polynomial against every term of the other, merging and re-sorting the combined factor lists into a canonical key). Finally, convert the resulting polynomial into the required sorted list of `"coefficient*factor1*factor2..."` strings.

## C# Solution

```csharp
public class Solution
{
    public IList<string> BasicCalculatorIV(string expression, string[] evalvars, int[] evalints)
    {
        var evalMap = new Dictionary<string, int>();
        for (int i = 0; i < evalvars.Length; i++)
            evalMap[evalvars[i]] = evalints[i];

        var tokens = Tokenize(expression);
        int pos = 0;
        var poly = ParseExpression(tokens, ref pos, evalMap);

        return PolyToList(poly);
    }

    private Dictionary<string, int> ParseExpression(List<string> tokens, ref int pos, Dictionary<string, int> evalMap)
    {
        var result = ParseTerm(tokens, ref pos, evalMap);

        while (pos < tokens.Count && (tokens[pos] == "+" || tokens[pos] == "-"))
        {
            var op = tokens[pos++];
            var next = ParseTerm(tokens, ref pos, evalMap);
            if (op == "-") next = Negate(next);
            result = Add(result, next);
        }

        return result;
    }

    private Dictionary<string, int> ParseTerm(List<string> tokens, ref int pos, Dictionary<string, int> evalMap)
    {
        var result = ParseFactor(tokens, ref pos, evalMap);

        while (pos < tokens.Count && tokens[pos] == "*")
        {
            pos++;
            var next = ParseFactor(tokens, ref pos, evalMap);
            result = Multiply(result, next);
        }

        return result;
    }

    private Dictionary<string, int> ParseFactor(List<string> tokens, ref int pos, Dictionary<string, int> evalMap)
    {
        if (tokens[pos] == "(")
        {
            pos++;
            var inner = ParseExpression(tokens, ref pos, evalMap);
            pos++;
            return inner;
        }

        var token = tokens[pos++];

        if (int.TryParse(token, out int number))
            return number == 0 ? new Dictionary<string, int>() : new Dictionary<string, int> { [""] = number };

        if (evalMap.TryGetValue(token, out int value))
            return value == 0 ? new Dictionary<string, int>() : new Dictionary<string, int> { [""] = value };

        return new Dictionary<string, int> { [token] = 1 };
    }

    private List<string> Tokenize(string expression)
    {
        var tokens = new List<string>();
        int i = 0;

        while (i < expression.Length)
        {
            char c = expression[i];

            if (c == ' ') { i++; continue; }

            if (c == '(' || c == ')' || c == '+' || c == '-' || c == '*')
            {
                tokens.Add(c.ToString());
                i++;
            }
            else
            {
                int start = i;
                while (i < expression.Length && expression[i] != ' ' && "()+-*".IndexOf(expression[i]) == -1)
                    i++;
                tokens.Add(expression.Substring(start, i - start));
            }
        }

        return tokens;
    }

    private Dictionary<string, int> Add(Dictionary<string, int> a, Dictionary<string, int> b)
    {
        var result = new Dictionary<string, int>(a);
        foreach (var kvp in b)
        {
            result[kvp.Key] = result.GetValueOrDefault(kvp.Key) + kvp.Value;
            if (result[kvp.Key] == 0) result.Remove(kvp.Key);
        }
        return result;
    }

    private Dictionary<string, int> Negate(Dictionary<string, int> a)
    {
        var result = new Dictionary<string, int>();
        foreach (var kvp in a)
            result[kvp.Key] = -kvp.Value;
        return result;
    }

    private Dictionary<string, int> Multiply(Dictionary<string, int> a, Dictionary<string, int> b)
    {
        var result = new Dictionary<string, int>();

        foreach (var termA in a)
        {
            foreach (var termB in b)
            {
                var factors = new List<string>();
                if (termA.Key.Length > 0) factors.AddRange(termA.Key.Split('*'));
                if (termB.Key.Length > 0) factors.AddRange(termB.Key.Split('*'));
                factors.Sort(StringComparer.Ordinal);

                var key = string.Join("*", factors);
                int coeff = termA.Value * termB.Value;

                result[key] = result.GetValueOrDefault(key) + coeff;
                if (result[key] == 0) result.Remove(key);
            }
        }

        return result;
    }

    private IList<string> PolyToList(Dictionary<string, int> poly)
    {
        var terms = poly.Where(kvp => kvp.Value != 0).ToList();

        terms.Sort((x, y) =>
        {
            int degX = x.Key.Length == 0 ? 0 : x.Key.Split('*').Length;
            int degY = y.Key.Length == 0 ? 0 : y.Key.Split('*').Length;

            if (degX != degY) return degY - degX;

            return string.Compare(x.Key, y.Key, StringComparison.Ordinal);
        });

        var result = new List<string>();
        foreach (var term in terms)
        {
            string factorsStr = term.Key.Length == 0 ? "" : "*" + term.Key;
            result.Add(term.Value + factorsStr);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case for parsing and polynomial multiplication.
- **Space:** `O(n^2)` for the resulting polynomial terms.
