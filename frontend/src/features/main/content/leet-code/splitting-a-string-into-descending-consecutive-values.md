# 1849. Splitting a String Into Descending Consecutive Values

**Difficulty:** Medium
**Category:** String, Backtracking

## Problem

Given a numeric string `s`, determine whether it can be split into two or more non-empty substrings such that, read as integers, each value is exactly one less than the previous value.

### Example

```
Input: s = "1234"
Output: false

Input: s = "050043"
Output: true
Explanation: [5, 4, 3] using segments "05","004","3".
```

## Approach

Backtrack over possible split points: try every prefix length for the current segment, parse it as a number, and recurse only if it's either the first segment (no constraint yet) or exactly one less than the previous segment's value. Succeed once the whole string is consumed with at least two segments used. Segment lengths are capped to avoid integer overflow while parsing.

## C# Solution

```csharp
public class Solution
{
    public bool SplitString(string s)
    {
        return Backtrack(s, 0, -1, 0);
    }

    private bool Backtrack(string s, int start, long previous, int partsUsed)
    {
        if (start == s.Length) return partsUsed >= 2;

        long value = 0;
        for (int end = start; end < s.Length; end++)
        {
            value = value * 10 + (s[end] - '0');
            if (end - start > 18) break;

            if ((previous == -1 || value == previous - 1) && Backtrack(s, end + 1, value, partsUsed + 1))
            {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case for trying all split points with backtracking.
- **Space:** `O(n)` recursion depth.
