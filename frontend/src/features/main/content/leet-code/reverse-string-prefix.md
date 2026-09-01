# 3794. Reverse String Prefix

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `s` and integer `k`, reverse the first `k` characters of `s` and return the resulting string.

### Example

Input: `s = "abcd", k = 2`
Output: `"bacd"`

## Approach

Reverse the substring `s[0..k-1]` and concatenate it with the unchanged remainder `s[k..]`.

## C# Solution

```csharp
public class Solution 
{
    public string ReversePrefix(string s, int k) 
    {
        char[] prefix = s.Substring(0, k).ToCharArray();
        Array.Reverse(prefix);
        return new string(prefix) + s.Substring(k);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
