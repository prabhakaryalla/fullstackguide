# 1556. Thousand Separator

**Difficulty:** Easy
**Category:** Math, String

## Problem

Given an integer `n`, add thousands separators (`.`) to it and return the resulting string.

### Example

```
Input: n = 1234567
Output: "1.234.567"
```

## Approach

Convert the number to its digit string, then walk it from the rightmost digit, inserting a separator every 3 digits (skipping the very first group). Build the result by prepending groups of digits.

## C# Solution

```csharp
public class Solution
{
    public string ThousandSeparator(int n)
    {
        string digits = n.ToString();
        var groups = new List<string>();

        for (int i = digits.Length; i > 0; i -= 3)
        {
            int start = Math.Max(0, i - 3);
            groups.Add(digits.Substring(start, i - start));
        }

        groups.Reverse();
        return string.Join(".", groups);
    }
}
```

## Complexity

- **Time:** `O(d)` where `d` is the number of digits in `n`.
- **Space:** `O(d)` for the group list and result string.
