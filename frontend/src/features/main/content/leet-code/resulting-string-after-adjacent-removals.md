# 3561. Resulting String After Adjacent Removals

**Difficulty:** Medium
**Category:** String, Stack

## Problem

You are given a string `s` consisting of lowercase English letters. In one operation, you may remove two adjacent characters from `s` if they are consecutive letters of the alphabet (their positions differ by exactly `1`, in either order, such as `'a'` and `'b'`). After a removal, the remaining parts of the string are joined together, which may create new adjacent pairs. Repeat this operation as many times as possible, and return the final resulting string. The result is unique regardless of the order operations are performed in.

### Example

`s = "abac"`. `'a'` and `'b'` are adjacent letters, so they can be removed, leaving `"ac"`. `'a'` and `'c'` differ by `2`, so no further removals are possible. The result is `"ac"`.

## Approach

Process the string with a stack. For each character, if the stack is non-empty and its top element is adjacent (differs by exactly `1`) to the current character, pop the stack (this removes the pair). Otherwise, push the current character. After scanning the whole string, the stack (read from bottom to top) contains the final result.

## C# Solution

```csharp
public class Solution 
{
    public string ResultingString(string s) 
    {
        Stack<char> stack = new Stack<char>();

        foreach (char c in s)
        {
            if (stack.Count > 0 && Math.Abs(stack.Peek() - c) == 1)
            {
                stack.Pop();
            }
            else
            {
                stack.Push(c);
            }
        }

        char[] result = new char[stack.Count];
        for (int i = result.Length - 1; i >= 0; i--)
        {
            result[i] = stack.Pop();
        }

        return new string(result);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
