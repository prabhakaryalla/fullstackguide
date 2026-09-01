# 3703. Remove K-Balanced Substrings

**Difficulty:** Medium
**Category:** String, Stack, Simulation

## Problem

Given a string `s` of `'('` and `')'` and an integer `k`, repeatedly remove the leftmost occurrence of the substring formed by `k` consecutive `'('` followed by `k` consecutive `')'` until no such substring remains. Return the final string.

### Example

Input: `s = "(()(()))"`, `k = 1`
Output: `"(())"`
Explanation: The innermost `"()"` blocks (each with 1 `'('` and 1 `')'`) are progressively removed until no `"()"` remains adjacent, leaving `"(())"`.

## Approach

Use a stack of `(char, run-length)` groups. Process each character, merging it into the top run if it matches, otherwise pushing a new run. After appending a `')'`, check whether the top run is exactly `k` closing parens sitting on top of a run of exactly `k` opening parens; if so, pop both runs to simulate the removal.

## C# Solution

```csharp
public class Solution 
{
    public string RemoveSubstring(string s, int k) 
    {
        var stack = new List<(char Ch, int Count)>();
        foreach (char c in s) 
        {
            if (stack.Count > 0 && stack[^1].Ch == c) 
            {
                var top = stack[^1];
                stack[^1] = (top.Ch, top.Count + 1);
            } 
            else 
            {
                stack.Add((c, 1));
            }
            if (c == ')' && stack[^1].Count == k && stack.Count >= 2 
                && stack[^2].Ch == '(' && stack[^2].Count == k) 
            {
                stack.RemoveAt(stack.Count - 1);
                stack.RemoveAt(stack.Count - 1);
            }
        }
        var sb = new System.Text.StringBuilder();
        foreach (var (ch, count) in stack) 
        {
            sb.Append(ch, count);
        }
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
