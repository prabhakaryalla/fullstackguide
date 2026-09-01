# 736. Parse Lisp Expression

**Difficulty:** Hard
**Category:** Hash Table, String, Stack, Recursion

## Problem

Given a string `expression` representing a Lisp-like expression using `let`, `add`, and `mult`, evaluate and return its integer result.

### Example

```
Input: expression = "(let x 2 (mult x (let x 3 y 4 (add x y))))"
Output: 14
```

## Approach

Use recursive descent evaluation with an explicit variable scope (a dictionary passed by value at each `let`, so inner scopes don't leak out). A bare token is either a numeric literal or a variable lookup in the current scope. A parenthesized expression is split into space-separated tokens (respecting nested parentheses when splitting) and dispatched based on its first token: `add` and `mult` evaluate their two operand sub-expressions and combine them; `let` processes `variable value` pairs left to right, adding each to a new scope copy (so later bindings can reference earlier ones), before evaluating the final trailing expression in that fully built scope.

## C# Solution

```csharp
public class Solution
{
    public int Evaluate(string expression)
    {
        return Eval(expression, new Dictionary<string, int>());
    }

    private int Eval(string expr, Dictionary<string, int> scope)
    {
        if (expr[0] != '(')
        {
            if (char.IsDigit(expr[0]) || expr[0] == '-')
                return int.Parse(expr);

            return scope[expr];
        }

        var inner = expr.Substring(1, expr.Length - 2);
        var tokens = Tokenize(inner);

        if (tokens[0] == "let")
        {
            var newScope = new Dictionary<string, int>(scope);

            int i = 1;
            while (i < tokens.Count - 1)
            {
                if (i == tokens.Count - 2)
                    return Eval(tokens[i], newScope);

                newScope[tokens[i]] = Eval(tokens[i + 1], newScope);
                i += 2;
            }

            return Eval(tokens[^1], newScope);
        }

        if (tokens[0] == "add")
            return Eval(tokens[1], scope) + Eval(tokens[2], scope);

        return Eval(tokens[1], scope) * Eval(tokens[2], scope);
    }

    private List<string> Tokenize(string s)
    {
        var tokens = new List<string>();
        int depth = 0;
        var current = new StringBuilder();

        foreach (var c in s)
        {
            if (c == '(') depth++;
            if (c == ')') depth--;

            if (c == ' ' && depth == 0)
            {
                tokens.Add(current.ToString());
                current.Clear();
            }
            else
            {
                current.Append(c);
            }
        }

        if (current.Length > 0)
            tokens.Add(current.ToString());

        return tokens;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case, due to substring and scope-copying operations.
- **Space:** `O(n)` for the recursion stack and scopes.
