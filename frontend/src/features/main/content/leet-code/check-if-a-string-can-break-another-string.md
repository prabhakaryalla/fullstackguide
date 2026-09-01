# 1433. Check If a String Can Break Another String

**Difficulty:** Medium
**Category:** String, Greedy, Sorting

## Problem

Given two strings `s1` and `s2` of the same length, string `x` can "break" string `y` if, after sorting both, every character in `x` is greater than or equal to the character at the same position in `y`. Return `true` if either `s1` can break `s2` or `s2` can break `s1`.

### Example

```
Input: s1 = "abc", s2 = "xya"
Output: true
```

## Approach

Sort the characters of both strings. Then check, in a single pass, whether `s1`'s sorted characters dominate `s2`'s at every position, or vice versa. If either direction holds throughout, one string can break the other.

## C# Solution

```csharp
public class Solution
{
    public bool CheckIfCanBreak(string s1, string s2)
    {
        var a = s1.ToCharArray();
        var b = s2.ToCharArray();
        Array.Sort(a);
        Array.Sort(b);

        bool aDominates = true, bDominates = true;

        for (int i = 0; i < a.Length; i++)
        {
            if (a[i] < b[i]) aDominates = false;
            if (b[i] < a[i]) bDominates = false;
        }

        return aDominates || bDominates;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(n)` for the sorted character arrays.
