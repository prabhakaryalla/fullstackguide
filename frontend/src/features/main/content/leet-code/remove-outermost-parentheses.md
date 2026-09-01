# 1021. Remove Outermost Parentheses

**Difficulty:** Easy
**Category:** String, Stack

## Problem

A valid parentheses string is either empty, or a concatenation of primitive valid parentheses strings, where a primitive string is one that isn't empty and cannot be split into two non-empty valid parentheses strings. Given a valid parentheses string `s`, return `s` after removing the outermost parentheses of every primitive substring.

### Example

```
Input: s = "(()())(())"
Output: "()()()"
```

## Approach

Track the current nesting `depth` while scanning left to right. For an opening bracket, only append it if it's not the outermost one of its primitive group (i.e., `depth > 0` before incrementing); for a closing bracket, decrement `depth` first, then append it only if it's not the outermost closer (`depth > 0` after decrementing).

## C# Solution

```csharp
public class Solution
{
    public string RemoveOuterParentheses(string s)
    {
        var result = new StringBuilder();
        int depth = 0;

        foreach (var c in s)
        {
            if (c == '(')
            {
                if (depth > 0) result.Append(c);
                depth++;
            }
            else
            {
                depth--;
                if (depth > 0) result.Append(c);
            }
        }

        return result.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(n)` for the result buffer.
