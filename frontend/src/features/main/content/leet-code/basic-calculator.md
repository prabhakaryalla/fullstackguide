# 224. Basic Calculator

**Difficulty:** Hard
**Category:** Math, String, Stack, Recursion

## Problem

Given a string `s` representing a valid mathematical expression, evaluate it and return the result. The expression may contain `+`, `-`, parentheses, and non-negative integers (no `*` or `/`).

### Example

```
s = "(1+(4+5+2)-3)+(6+8)" -> 23
```

## Approach

Walk the string once, tracking a running total, the current number being parsed, and the current sign. Push the running total and sign onto a stack whenever an opening parenthesis is hit (saving state before entering the sub-expression), and pop them back on a closing parenthesis to fold the sub-expression's result into the outer expression.

## C# Solution

```csharp
public class Solution
{
    public int Calculate(string s)
    {
        var stack = new Stack<int>();
        int result = 0, number = 0, sign = 1;

        foreach (char c in s)
        {
            if (char.IsDigit(c))
            {
                number = number * 10 + (c - '0');
            }
            else if (c == '+')
            {
                result += sign * number;
                number = 0;
                sign = 1;
            }
            else if (c == '-')
            {
                result += sign * number;
                number = 0;
                sign = -1;
            }
            else if (c == '(')
            {
                stack.Push(result);
                stack.Push(sign);
                result = 0;
                sign = 1;
            }
            else if (c == ')')
            {
                result += sign * number;
                number = 0;
                result *= stack.Pop(); // sign before the parenthesis
                result += stack.Pop(); // result accumulated before the parenthesis
            }
        }

        return result + sign * number;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass over the string.
- **Space:** `O(n)` — for the stack, in the worst case of deeply nested parentheses.
