# 1544. Make The String Great

**Difficulty:** Easy
**Category:** String, Stack

## Problem

Given a string `s`, repeatedly remove any adjacent pair of characters where one is the lowercase and the other is the uppercase version of the same letter (e.g. `"Aa"` or `"bB"`), until no such pair remains. Return the resulting string.

### Example

```
Input: s = "leEeetcode"
Output: "leetcode"
```

## Approach

Use a stack. For each character, if the stack is non-empty and its top character forms a "bad pair" with the current character (same letter, opposite case), pop the stack (removing both); otherwise, push the current character. The stack's final contents, read from bottom to top, form the result.

## C# Solution

```csharp
public class Solution
{
    public string MakeGood(string s)
    {
        var stack = new Stack<char>();

        foreach (char c in s)
        {
            if (stack.Count > 0 && char.ToLower(stack.Peek()) == char.ToLower(c) && stack.Peek() != c)
            {
                stack.Pop();
            }
            else
            {
                stack.Push(c);
            }
        }

        char[] result = stack.ToArray();
        Array.Reverse(result);
        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
