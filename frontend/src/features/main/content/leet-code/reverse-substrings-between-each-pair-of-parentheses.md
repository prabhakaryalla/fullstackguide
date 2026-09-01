# 1190. Reverse Substrings Between Each Pair of Parentheses

**Difficulty:** Medium
**Category:** Stack, String

## Problem

Given a string `s` containing lowercase letters and matched parentheses, reverse the characters inside every pair of parentheses starting from the innermost pair, and return the final string with no parentheses remaining.

### Example

```
Input: s = "(u(love)i)"
Output: "iloveu"
```

## Approach

Use a stack of string builders: push a new, empty builder whenever an opening parenthesis is seen. On a closing parenthesis, pop the current builder, reverse its contents (since everything inside has already been recursively resolved), and append that reversed text onto the new top of the stack. Regular characters are simply appended to whichever builder is currently on top.

## C# Solution

```csharp
public class Solution
{
    public string ReverseParentheses(string s)
    {
        var stack = new Stack<StringBuilder>();
        stack.Push(new StringBuilder());

        foreach (char c in s)
        {
            if (c == '(')
            {
                stack.Push(new StringBuilder());
            }
            else if (c == ')')
            {
                var top = stack.Pop();
                var reversed = new string(top.ToString().Reverse().ToArray());
                stack.Peek().Append(reversed);
            }
            else
            {
                stack.Peek().Append(c);
            }
        }

        return stack.Pop().ToString();
    }
}
```

## Complexity

- **Time:** `O(n^2)` worst case, due to repeated reversals of nested segments.
- **Space:** `O(n)` for the stack of builders.
