# 400. Nth Digit

**Difficulty:** Medium
**Category:** Math, Binary Search

## Problem

Given an integer `n`, return the `n`th digit of the infinite integer sequence `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]`.

### Example

```
Input: n = 11
Output: 0
Explanation: The 11th digit of the sequence 1, 2, 3, ..., 10, 11, ... is 0, which is part of 10.
```

### Constraints

- `1 <= n <= 2^31 - 1`

## Approach

Numbers with `digits` digits contribute `digits * count` total digits to the sequence, where `count` is how many `digits`-digit numbers exist (`9`, `90`, `900`, ...). Subtract off whole digit-length groups until `n` falls within the current group, then locate the exact number and digit position within that group using integer division and modulo.

## C# Solution

```csharp
public class Solution
{
    public int FindNthDigit(int n)
    {
        long digits = 1, count = 9, start = 1;

        while (n > digits * count)
        {
            n -= (int)(digits * count);
            digits++;
            count *= 10;
            start *= 10;
        }

        long number = start + (n - 1) / digits;
        int digitIndex = (int)((n - 1) % digits);

        return number.ToString()[digitIndex] - '0';
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(log n)` for the number-to-string conversion.
