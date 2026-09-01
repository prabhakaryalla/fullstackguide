# 2796. Repeat String

**Difficulty:** Easy
**Category:** String, Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a string `s` and a positive integer `times`, return a new string consisting of `s` concatenated with itself `times` times, without relying on a built-in "repeat" helper.

### Example
```
Input: s = "abc", times = 3
Output: "abcabcabc"
```

## Approach
Build the result by appending `s` to a mutable buffer `times` times, rather than delegating to any repeat-style built-in.

## C# Solution

```csharp
public class Solution
{
    public static string RepeatString(string s, int times)
    {
        var sb = new StringBuilder();

        for (int i = 0; i < times; i++)
        {
            sb.Append(s);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(n * times) where n is the length of `s`.
- **Space:** O(n * times).
