# 856. Score of Parentheses

**Difficulty:** Medium
**Category:** String, Stack

## Problem

Given a balanced parentheses string `s`, compute its score using the rules: `"()"` has score 1; `AB` (concatenation) has score `score(A) + score(B)`; and `(A)` has score `2 * score(A)`.

### Example

```
Input: s = "(()(()))"
Output: 6
```

## Approach

Use a stack where each level represents the accumulated score at that depth of nesting. Push a new `0` frame on `'('`. On `')'`, pop the innermost score: if it was `0` (an empty `"()"` pair), its contribution is `1`; otherwise its contribution is double its accumulated value (`2 * score`), and this contribution is added to the score at the next level down (now the top of the stack).

## C# Solution

```csharp
public class Solution
{
    public int ScoreOfParentheses(string s)
    {
        var stack = new Stack<int>();
        stack.Push(0);

        foreach (var c in s)
        {
            if (c == '(')
            {
                stack.Push(0);
            }
            else
            {
                int inner = stack.Pop();
                int score = inner == 0 ? 1 : 2 * inner;
                stack.Push(stack.Pop() + score);
            }
        }

        return stack.Pop();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
