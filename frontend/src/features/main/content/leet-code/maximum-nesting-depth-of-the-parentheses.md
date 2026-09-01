# 1614. Maximum Nesting Depth of the Parentheses

**Difficulty:** Easy
**Category:** String, Stack

## Problem

Given a valid parentheses string `s` (possibly containing other characters), return its maximum nesting depth.

### Example

```
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
```

## Approach

Scan the string keeping a running depth counter: increment on `(`, decrement on `)`, tracking the maximum value seen. Since the string is guaranteed valid, no explicit stack of characters is needed.

## C# Solution

```csharp
public class Solution
{
    public int MaxDepth(string s)
    {
        int depth = 0;
        int maxDepth = 0;

        foreach (char c in s)
        {
            if (c == '(')
            {
                depth++;
                maxDepth = Math.Max(maxDepth, depth);
            }
            else if (c == ')')
            {
                depth--;
            }
        }

        return maxDepth;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
