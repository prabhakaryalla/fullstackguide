# 439. Ternary Expression Parser

**Difficulty:** Medium
**Category:** Stack, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string representing an arbitrarily nested ternary expression (using `T` for true, `F` for false, `?` and `:` as operators), evaluate the expression and return the result as a string.

### Example

```
Input: expression = "T?2:3"
Output: "2"
```

### Constraints

- `5 <= expression.length <= 10^4`
- Expression contains only digits, `'T'`, `'F'`, `'?'`, and `':'`.

## Approach

Scan the expression from right to left using a stack. Non-operator characters (digits, `T`, `F`) are pushed directly. When a `'?'` is encountered, the top two stack values are the "true" and "false" branches of the ternary expression immediately preceding it, and the character just before the `'?'` is the condition; pop both branch values, push whichever one the condition selects, and skip over the condition character (and the `':'`, which is simply ignored). Processing right to left correctly resolves nested ternaries from the innermost outward.

## C# Solution

```csharp
public class Solution
{
    public string ParseTernary(string expression)
    {
        var stack = new Stack<char>();

        for (int i = expression.Length - 1; i >= 0; i--)
        {
            char c = expression[i];

            if (c == '?')
            {
                char trueVal = stack.Pop();
                char falseVal = stack.Pop();
                char condition = expression[--i];

                stack.Push(condition == 'T' ? trueVal : falseVal);
            }
            else if (c != ':')
            {
                stack.Push(c);
            }
        }

        return stack.Peek().ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
