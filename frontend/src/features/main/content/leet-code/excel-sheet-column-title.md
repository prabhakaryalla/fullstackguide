# 168. Excel Sheet Column Title

**Difficulty:** Easy
**Category:** Math, String

## Problem

Given a positive integer `columnNumber`, return its corresponding column title as it would appear in a spreadsheet (like Excel), where `A = 1, B = 2, ..., Z = 26, AA = 27, AB = 28, ...`.

### Example

```
columnNumber = 1 -> "A"
columnNumber = 28 -> "AB"
columnNumber = 701 -> "ZY"
```

## Approach

This is base-26 conversion, but with a twist: there's no symbol for zero, so the digits run `1..26` instead of `0..25`. Before taking `columnNumber % 26`, subtract 1 first so the range shifts to `0..25` — this correctly handles multiples of 26 (which would otherwise map to a phantom "zero" digit).

## C# Solution

```csharp
public class Solution
{
    public string ConvertToTitle(int columnNumber)
    {
        var sb = new StringBuilder();

        while (columnNumber > 0)
        {
            columnNumber--; // shift to a 0-25 range before the modulo
            char letter = (char)('A' + columnNumber % 26);
            sb.Insert(0, letter);
            columnNumber /= 26;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(log26(columnNumber))` — proportional to the number of output letters.
- **Space:** `O(log26(columnNumber))` — for the output string.
