# 678. Valid Parenthesis String

**Difficulty:** Medium
**Category:** String, Stack, Greedy, Dynamic Programming

## Problem

Given a string `s` containing only `'('`, `')'`, and `'*'` (which can represent `'('`, `')'`, or an empty string), return `true` if `s` can be interpreted as a valid parentheses string.

### Example

```
Input: s = "(*))"
Output: true
```

### Constraints

- `1 <= s.length <= 100`

## Approach

Track a range `[minOpen, maxOpen]` representing the minimum and maximum possible number of unmatched open parentheses at each point, given every possible interpretation of the wildcards seen so far. A `'('` increases both bounds; a `')'` decreases both; a `'*'` decreases the minimum (treating it as `')'`) and increases the maximum (treating it as `'('`). If `maxOpen` ever drops below zero, no interpretation can recover, so the string is invalid; clamp `minOpen` to zero whenever it goes negative (since a `'*'` could always be treated as empty instead of closing). The string is valid if `minOpen` can reach exactly zero by the end.

## C# Solution

```csharp
public class Solution
{
    public bool CheckValidString(string s)
    {
        int minOpen = 0, maxOpen = 0;

        foreach (var c in s)
        {
            if (c == '(')
            {
                minOpen++;
                maxOpen++;
            }
            else if (c == ')')
            {
                minOpen--;
                maxOpen--;
            }
            else
            {
                minOpen--;
                maxOpen++;
            }

            if (maxOpen < 0) return false;

            minOpen = Math.Max(minOpen, 0);
        }

        return minOpen == 0;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
