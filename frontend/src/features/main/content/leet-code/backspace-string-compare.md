# 844. Backspace String Compare

**Difficulty:** Easy
**Category:** Two Pointers, String, Stack, Simulation

## Problem

Given two strings `s` and `t`, where `'#'` represents a backspace character (deleting the previous character, if any), return `true` if the two strings are equal after processing all backspaces.

### Example

```
Input: s = "ab#c", t = "ad#c"
Output: true
```

## Approach

Simulate typing each string using a stack: push regular characters, and pop (if non-empty) on `'#'`. Build the final resulting string for each input this way, then compare the two results directly.

## C# Solution

```csharp
public class Solution
{
    public bool BackspaceCompare(string s, string t)
    {
        return Build(s) == Build(t);
    }

    private string Build(string s)
    {
        var stack = new Stack<char>();

        foreach (var c in s)
        {
            if (c == '#')
            {
                if (stack.Count > 0) stack.Pop();
            }
            else
            {
                stack.Push(c);
            }
        }

        return new string(stack.Reverse().ToArray());
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n + m)` for the stacks.
