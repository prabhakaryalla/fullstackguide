# 925. Long Pressed Name

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a `name` typed on a keyboard and the resulting `typed` string, some characters may have been long-pressed and appear extra times. Return `true` if `typed` could be the result of typing `name` with some characters long-pressed.

### Example

```
Input: name = "alex", typed = "aaleex"
Output: true
```

## Approach

Walk both strings with two pointers. If characters match, advance both; if they don't match but the current `typed` character equals the previous one, it's a long-press repeat, so only advance `typed`. Any other mismatch means it's invalid. At the end, every character of `name` must have been consumed.

## C# Solution

```csharp
public class Solution
{
    public bool IsLongPressedName(string name, string typed)
    {
        int i = 0, j = 0;

        while (j < typed.Length)
        {
            if (i < name.Length && name[i] == typed[j]) { i++; j++; }
            else if (j > 0 && typed[j] == typed[j - 1]) j++;
            else return false;
        }

        return i == name.Length;
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(1)`.
