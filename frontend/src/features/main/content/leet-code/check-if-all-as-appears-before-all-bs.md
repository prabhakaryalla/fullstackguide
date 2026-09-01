# 2124. Check if All A's Appears Before All B's

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` consisting only of 'a' and 'b', return `true` if every 'a' appears before every 'b' in the string, `false` otherwise.

### Example

```
Input: s = "aaabbb"
Output: true

Input: s = "abab"
Output: false
```

## Approach

Check if the string contains the substring "ba". If it does, return false; otherwise, return true. Alternatively, find the last 'a' and first 'b' and ensure last 'a' comes before first 'b'.

## C# Solution

```csharp
public class Solution
{
    public bool CheckString(string s)
    {
        return !s.Contains("ba");
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
