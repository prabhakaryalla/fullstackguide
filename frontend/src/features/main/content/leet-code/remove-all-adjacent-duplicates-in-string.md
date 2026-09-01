# 1047. Remove All Adjacent Duplicates In String

**Difficulty:** Easy
**Category:** String, Stack

## Problem

Given a string `s` of lowercase letters, repeatedly remove adjacent pairs of equal letters until no such pairs remain. Return the final string.

### Example

```
Input: s = "abbaca"
Output: "ca"
```

## Approach

A stack naturally handles cascading removals: scan the string left to right, and if the current character matches the character on top of the stack, pop it (they cancel out); otherwise push the current character. Whatever remains on the stack at the end, read bottom-to-top, is the fully reduced string.

## C# Solution

```csharp
public class Solution
{
    public string RemoveDuplicates(string s)
    {
        var stack = new Stack<char>();

        foreach (var c in s)
        {
            if (stack.Count > 0 && stack.Peek() == c)
            {
                stack.Pop();
            }
            else
            {
                stack.Push(c);
            }
        }

        var chars = stack.ToArray();
        Array.Reverse(chars);
        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
