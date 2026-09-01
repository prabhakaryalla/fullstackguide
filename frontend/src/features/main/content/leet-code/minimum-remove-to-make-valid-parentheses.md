# 1249. Minimum Remove to Make Valid Parentheses

**Difficulty:** Medium
**Category:** String, Stack

## Problem

Given a string `s` containing lowercase letters and the characters `'('` and `')'`, remove the minimum number of parentheses so the resulting string is valid (every open parenthesis has a matching close, in order), and return any valid result.

### Example

```
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
```

## Approach

Scan the string while pushing the index of every `'('` onto a stack. For each `')'`, if the stack is non-empty, pop it (it's matched); otherwise this `')'` is unmatched and marked for removal. After the scan, any indices still left on the stack are unmatched `'('` characters, so mark those for removal too. Finally, rebuild the string skipping every marked index.

## C# Solution

```csharp
public class Solution
{
    public string MinRemoveToMakeValid(string s)
    {
        var chars = s.ToCharArray();
        var stack = new Stack<int>();
        var toRemove = new HashSet<int>();

        for (int i = 0; i < chars.Length; i++)
        {
            if (chars[i] == '(')
            {
                stack.Push(i);
            }
            else if (chars[i] == ')')
            {
                if (stack.Count > 0) stack.Pop();
                else toRemove.Add(i);
            }
        }

        while (stack.Count > 0) toRemove.Add(stack.Pop());

        var sb = new StringBuilder();
        for (int i = 0; i < chars.Length; i++)
            if (!toRemove.Contains(i)) sb.Append(chars[i]);

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `s`.
- **Space:** `O(n)` for the stack and removal set.
