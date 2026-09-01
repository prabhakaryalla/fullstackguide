# 405. Convert a Number to Hexadecimal

**Difficulty:** Easy
**Category:** Math, Bit Manipulation

## Problem

Given a 32-bit integer `num`, return a string representing its hexadecimal representation using two's complement for negative numbers, with no leading zeros (unless the number itself is zero).

### Example

```
Input: num = -1
Output: "ffffffff"
```

### Constraints

- `-2^31 <= num <= 2^31 - 1`

## Approach

Treat the integer's bit pattern as an unsigned 32-bit value so that negative numbers naturally produce their two's-complement hex digits. Repeatedly extract the lowest 4 bits as a hex digit and shift right by 4, prepending each digit, until the value becomes zero.

## C# Solution

```csharp
public class Solution
{
    public string ToHex(int num)
    {
        if (num == 0) return "0";

        const string hexDigits = "0123456789abcdef";
        uint value = (uint)num;
        var sb = new StringBuilder();

        while (value != 0)
        {
            sb.Insert(0, hexDigits[(int)(value & 0xF)]);
            value >>= 4;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by at most 8 hex digits.
- **Space:** `O(1)`.
