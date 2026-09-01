# 1003. Check If Word Is Valid After Substitutions

**Difficulty:** Medium
**Category:** String, Stack

## Problem

Given a string `s`, determine if it is valid, where a string is valid if it can be built starting from an empty string by repeatedly inserting the substring `"abc"` at any position.

### Example

```
Input: s = "aabcbc"
Output: true
```

## Approach

Process the string with a stack of characters. Push every character except `'c'`. When a `'c'` is encountered, the two most recently pushed characters must be `'a'` then `'b'` for a valid `"abc"` insertion — pop them off; otherwise the string is invalid. At the end, `s` is valid only if the stack is empty.

## C# Solution

```csharp
public class Solution
{
    public bool IsValid(string s)
    {
        var stack = new Stack<char>();

        foreach (var c in s)
        {
            if (c == 'c')
            {
                if (stack.Count < 2) return false;
                var second = stack.Pop();
                var first = stack.Pop();
                if (first != 'a' || second != 'b') return false;
            }
            else
            {
                stack.Push(c);
            }
        }

        return stack.Count == 0;
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
