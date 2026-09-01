# 1876. Substrings of Size Three with Distinct Characters

**Difficulty:** Easy
**Category:** String, Sliding Window, Hash Table

## Problem

Given a string `s`, return the number of length-3 substrings (allowing overlaps) whose characters are all distinct (a "good" substring).

### Example

```
Input: s = "xyzzaz"
Output: 1
```

## Approach

Slide a window of 3 consecutive characters across the string and directly check that all three are pairwise different (small fixed-size comparison), counting the substrings that qualify.

## C# Solution

```csharp
public class Solution
{
    public int CountGoodSubstrings(string s)
    {
        int count = 0;

        for (int i = 0; i + 2 < s.Length; i++)
        {
            if (s[i] != s[i + 1] && s[i + 1] != s[i + 2] && s[i] != s[i + 2]) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
