# 3602. Hexadecimal and Hexatrigesimal Conversion

**Difficulty:** Easy
**Category:** Math, String

## Problem
Given a positive integer `n`, convert it to its base-16 (hexadecimal) representation and its base-36 (hexatrigesimal) representation. For both bases, use digits `0-9` followed by uppercase letters `A-Z` for values `10` and above. Return a string array `[hex, hexatrigesimal]` containing the two representations (no leading zeros, except that `0` itself is represented as `"0"`).

## Approach
Implement a generic base-conversion routine: repeatedly take `n % base` to get the next least-significant digit, map it to the corresponding character (`0-9` then `A-Z`), and divide `n` by `base` until it reaches zero. Collect digits in a list and reverse them at the end (since they are produced least-significant first). Apply this routine once with `base = 16` and once with `base = 36`.

## C# Solution

```csharp
public class Solution 
{
    public string[] ConvertToBases(int n) 
    {
        return new string[] { ConvertToBase(n, 16), ConvertToBase(n, 36) };
    }

    private string ConvertToBase(int n, int b) 
    {
        if (n == 0)
            return "0";

        const string digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var sb = new System.Text.StringBuilder();

        while (n > 0)
        {
            sb.Append(digits[n % b]);
            n /= b;
        }

        var chars = sb.ToString().ToCharArray();
        Array.Reverse(chars);
        return new string(chars);
    }
}
```

## Complexity

- **Time:** O(log n) for each base conversion
- **Space:** O(log n) for the output strings
