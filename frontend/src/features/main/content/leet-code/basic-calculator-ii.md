# 227. Basic Calculator II

**Difficulty:** Medium
**Category:** Math, String, Stack

## Problem

Given a string `s` representing a non-negative integer expression, evaluate it and return the result. The expression may contain `+`, `-`, `*`, `/` (integer division, truncated toward zero), and spaces (no parentheses).

### Example

```
s = "3+2*2" -> 7
s = " 3/2 " -> 1
```

## Approach

Since `*` and `/` bind tighter than `+`/`-`, use a stack to defer addition/subtraction: push each parsed number onto the stack with its preceding sign applied, but for `*`/`/`, immediately pop the previous number, apply the operator with the new number, and push the combined result back. Summing the whole stack at the end correctly respects operator precedence without building a full expression tree.

## C# Solution

```csharp
public class Solution
{
    public int Calculate(string s)
    {
        var stack = new Stack<int>();
        int number = 0;
        char lastOp = '+';

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];

            if (char.IsDigit(c))
            {
                number = number * 10 + (c - '0');
            }

            bool isLastChar = i == s.Length - 1;

            if ((!char.IsDigit(c) && c != ' ') || isLastChar)
            {
                switch (lastOp)
                {
                    case '+': stack.Push(number); break;
                    case '-': stack.Push(-number); break;
                    case '*': stack.Push(stack.Pop() * number); break;
                    case '/': stack.Push(stack.Pop() / number); break;
                }

                lastOp = c;
                number = 0;
            }
        }

        int result = 0;
        foreach (var value in stack) result += value;
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass over the string.
- **Space:** `O(n)` — for the stack.
