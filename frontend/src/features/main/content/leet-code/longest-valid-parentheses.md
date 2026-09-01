# 32. Longest Valid Parentheses

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Stack

## Problem

Given a string containing just the characters `'('` and `')'`, return the length of the longest valid (well-formed) parentheses substring.

### Example 1

```
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
```

```mermaid
graph LR
    A["("] --- B["("] --- C[")"]
    style B fill:#4caf50,color:#fff
    style C fill:#4caf50,color:#fff
```

### Example 2

```
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
```

### Example 3

```
Input: s = ""
Output: 0
```

### Constraints

- `0 <= s.length <= 3 * 10^4`
- `s[i]` is `'('`, or `')'`.

## Approach

Use a stack that stores indices instead of characters, seeded with `-1` as a sentinel base for length calculations. Push the index of every `'('`. On `')'`, pop the stack — if the stack becomes empty, push the current index as the new base; otherwise the current valid length is `i - stack.Peek()`.

## C# Solution

```csharp
public class Solution
{
    public int LongestValidParentheses(string s)
    {
        var stack = new Stack<int>();
        stack.Push(-1);
        int maxLen = 0;

        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == '(')
            {
                stack.Push(i);
            }
            else
            {
                stack.Pop();

                if (stack.Count == 0)
                {
                    stack.Push(i);
                }
                else
                {
                    maxLen = Math.Max(maxLen, i - stack.Peek());
                }
            }
        }

        return maxLen;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass with a stack.
- **Space:** `O(n)` — worst case the stack holds every index.
