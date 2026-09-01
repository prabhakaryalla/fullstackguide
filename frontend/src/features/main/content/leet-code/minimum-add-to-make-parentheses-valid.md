# 921. Minimum Add to Make Parentheses Valid

**Difficulty:** Medium
**Category:** String, Stack, Greedy

## Problem

Given a string `s` of `'('` and `')'` characters, return the minimum number of insertions needed to make the parentheses valid (every open paired with a following close).

### Example

```
Input: s = "())"
Output: 1
```

## Approach

Scan left to right tracking `open`, the count of unmatched `'('` seen so far. On each `')'`, either close an unmatched `'('` (decrement `open`) or, if none are open, it's an unmatched close that needs one insertion. Any `open` left over at the end also each need one insertion.

## C# Solution

```csharp
public class Solution
{
    public int MinAddToMakeValid(string s)
    {
        int open = 0, additions = 0;

        foreach (var c in s)
        {
            if (c == '(') open++;
            else if (open > 0) open--;
            else additions++;
        }

        return additions + open;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
