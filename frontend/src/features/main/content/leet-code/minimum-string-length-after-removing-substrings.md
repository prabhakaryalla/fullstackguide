# 2696. Minimum String Length After Removing Substrings

**Difficulty:** Easy
**Category:** String, Stack

## Problem

You are given a string `s` consisting only of uppercase English letters.

You can apply some operations to this string where, in one operation, you can remove any occurrence of one of the substrings `"AB"` or `"CD"` from `s`.

Return the minimum possible length of the resulting string after applying operations repeatedly.

### Example

```
Input: s = "ABFCACDB"
Output: 2
Explanation: Remove "AB" -> "FCACDB", then remove "CD" -> "FCAB", then remove "AB" -> "FC".

Input: s = "ACBBD"
Output: 5
Explanation: No "AB" or "CD" substrings can be removed.
```

## Approach

Use a stack to process characters one by one. When pushing a character, check if it forms "AB" or "CD" with the top of the stack. If so, pop the stack instead of pushing. The final stack size is the answer.

## C# Solution

```csharp
public class Solution
{
    public int MinLength(string s)
    {
        var stack = new Stack<char>();
        
        foreach (char c in s)
        {
            if (stack.Count > 0)
            {
                char top = stack.Peek();
                if ((top == 'A' && c == 'B') || (top == 'C' && c == 'D'))
                {
                    stack.Pop();
                    continue;
                }
            }
            stack.Push(c);
        }
        
        return stack.Count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the stack
