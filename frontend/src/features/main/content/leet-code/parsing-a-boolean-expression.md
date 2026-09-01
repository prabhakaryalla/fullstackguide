# 1106. Parsing A Boolean Expression

**Difficulty:** Hard
**Category:** Stack, String, Recursion

## Problem

Given a boolean expression built from `t` (true), `f` (false), `!(expr)` (not), `&(expr,expr,...)` (and), and `|(expr,expr,...)` (or), evaluate it and return the resulting boolean.

### Example

```
Input: expression = "|(f,f,f,t)"
Output: true
```

## Approach

Scan the string while pushing characters onto a stack, ignoring commas. Whenever a `)` is seen, pop operand characters until the matching `(` is found, tally whether any operand was `t` and whether any was `f`, pop the `(` and the operator, compute the result (`!` negates the single operand, `&` is true only if no `f` was seen, `|` is true if any `t` was seen), and push the result back onto the stack as `'t'`/`'f'`.

## C# Solution

```csharp
public class Solution
{
    public bool ParseBoolExpr(string expression)
    {
        var stack = new Stack<char>();

        foreach (char c in expression)
        {
            if (c == ',') continue;

            if (c == ')')
            {
                bool hasTrue = false, hasFalse = false;

                while (stack.Peek() != '(')
                {
                    char v = stack.Pop();
                    if (v == 't') hasTrue = true;
                    if (v == 'f') hasFalse = true;
                }

                stack.Pop();
                char op = stack.Pop();
                bool result = op switch
                {
                    '!' => !hasTrue,
                    '&' => !hasFalse,
                    '|' => hasTrue,
                    _ => false
                };
                stack.Push(result ? 't' : 'f');
            }
            else
            {
                stack.Push(c);
            }
        }

        return stack.Pop() == 't';
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
