# 1784. Check if Binary String Has at Most One Segment of Ones

**Difficulty:** Easy
**Category:** String

## Problem

Given a binary string `s`, return `true` if it contains at most one contiguous segment of `'1'`s.

### Example

```
Input: s = "1001"
Output: false
```

## Approach

A second segment of ones can only exist if a `'0'` is immediately followed later by a `'1'`, i.e., the substring `"01"` appears somewhere in `s`. So the string has at most one segment of ones exactly when it does not contain `"01"`.

## C# Solution

```csharp
public class Solution
{
    public bool CheckOnesSegment(string s)
    {
        return !s.Contains("01");
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
