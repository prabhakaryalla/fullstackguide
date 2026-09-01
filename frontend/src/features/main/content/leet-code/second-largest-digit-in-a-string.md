# 1796. Second Largest Digit in a String

**Difficulty:** Easy
**Category:** String

## Problem

Given an alphanumeric string `s`, return the second largest distinct digit that appears in it, or `-1` if no such digit exists.

### Example

```
Input: s = "dfa12321afd"
Output: 2
```

## Approach

Collect all distinct digit characters that appear in the string into a set. If fewer than two distinct digits exist, return `-1`; otherwise, sort the distinct digits descending and return the second one.

## C# Solution

```csharp
public class Solution
{
    public int SecondHighest(string s)
    {
        var digits = new HashSet<int>();
        foreach (char c in s)
            if (char.IsDigit(c)) digits.Add(c - '0');

        if (digits.Count < 2) return -1;

        var sorted = digits.OrderByDescending(x => x).ToList();
        return sorted[1];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (at most 10 distinct digits).
