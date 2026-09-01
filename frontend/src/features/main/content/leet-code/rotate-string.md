# 796. Rotate String

**Difficulty:** Easy
**Category:** String, String Matching

## Problem

Given two strings `s` and `goal`, return `true` if `s` can become `goal` after some number of left-shift rotations.

### Example

```
Input: s = "abcde", goal = "cdeab"
Output: true
```

## Approach

If `goal` is a rotation of `s`, it must appear as a substring of `s` concatenated with itself (since concatenating `s` with itself contains every possible rotation of `s` as a contiguous substring). Check lengths match first, then perform this substring check.

## C# Solution

```csharp
public class Solution
{
    public bool RotateString(string s, string goal)
    {
        if (s.Length != goal.Length) return false;
        return (s + s).Contains(goal);
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the substring search (or `O(n)` with a linear-time string matching algorithm).
- **Space:** `O(n)` for the concatenated string.
