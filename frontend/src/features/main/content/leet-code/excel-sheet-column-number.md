# 171. Excel Sheet Column Number

**Difficulty:** Easy
**Category:** Math, String

## Problem

Given a spreadsheet column title as it appears in Excel (e.g. `"A"`, `"AB"`, `"ZY"`), return its corresponding column number (the inverse of Excel Sheet Column Title).

### Example

```
columnTitle = "A" -> 1
columnTitle = "AB" -> 28
columnTitle = "ZY" -> 701
```

## Approach

This is base-26 conversion where digits run `1..26` instead of `0..25`. Process the letters left to right, multiplying the running total by 26 and adding the current letter's 1-indexed value (`letter - 'A' + 1`) at each step.

## C# Solution

```csharp
public class Solution
{
    public int TitleToNumber(string columnTitle)
    {
        int result = 0;

        foreach (char c in columnTitle)
        {
            result = result * 26 + (c - 'A' + 1);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — where `n` is the length of the title.
- **Space:** `O(1)`.
