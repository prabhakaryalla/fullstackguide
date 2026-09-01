# 1528. Shuffle String

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given a string `s` and an integer array `indices` of the same length, return the string formed by placing each character `s[i]` at position `indices[i]` in the result.

### Example

```
Input: s = "codeleet", indices = [4,5,6,7,0,2,1,3]
Output: "leetcode"
```

## Approach

Allocate a result character array of the same length. For each index `i` in the input, place `s[i]` at `result[indices[i]]`.

## C# Solution

```csharp
public class Solution
{
    public string RestoreString(string s, int[] indices)
    {
        char[] result = new char[s.Length];

        for (int i = 0; i < s.Length; i++)
        {
            result[indices[i]] = s[i];
        }

        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the string.
- **Space:** `O(n)` for the result buffer.
