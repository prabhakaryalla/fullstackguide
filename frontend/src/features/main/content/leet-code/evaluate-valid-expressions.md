# 3749. Evaluate Valid Expressions

**Difficulty:** Hard
**Category:** Stack, String, Recursion, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a string `expression` representing a valid arithmetic expression containing non-negative integers, the operators `+`, `-`, `*`, `/`, and parentheses `(` and `)`. Evaluate the expression following standard operator precedence (multiplication and division before addition and subtraction) and return the integer result. Division should truncate toward zero. It is guaranteed the expression is well-formed and does not divide by zero.

## Approach
Use a recursive-descent / stack-based evaluator, similar to LeetCode's classic "Basic Calculator" family. Maintain a stack of intermediate values and a "sign" tracker. Iterate through the characters: when a digit is found, parse the full number; when `(` is found, recursively evaluate the sub-expression inside the matching parentheses; apply `*` and `/` immediately against the last stack value (since they have higher precedence), and push `+`/`-` values onto the stack, negated as needed for subtraction. At the end (or at a matching `)`), sum the stack to get the result of that sub-expression.

## C# Solution

```csharp
public class Solution 
{
    private int pos;
    private string expr;

    public int Evaluate(string expression)
    {
        expr = expression;
        pos = 0;
        return Calculate();
    }

    private int Calculate()
    {
        var stack = new Stack<int>();
        char sign = '+';
        int num = 0;

        while (pos < expr.Length)
        {
            char c = expr[pos];

            if (char.IsDigit(c))
            {
                num = num * 10 + (c - '0');
            }

            if (c == '(')
            {
                pos++;
                num = Calculate();
            }

            if ((!char.IsDigit(c) && c != ' ') || pos == expr.Length - 1)
            {
                switch (sign)
                {
                    case '+':
                        stack.Push(num);
                        break;
                    case '-':
                        stack.Push(-num);
                        break;
                    case '*':
                        stack.Push(stack.Pop() * num);
                        break;
                    case '/':
                        stack.Push(stack.Pop() / num);
                        break;
                }
                sign = c;
                num = 0;
            }

            if (c == ')')
            {
                break;
            }

            pos++;
        }

        int result = 0;
        foreach (int v in stack)
        {
            result += v;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
