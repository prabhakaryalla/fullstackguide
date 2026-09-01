# 393. UTF-8 Validation

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

Given an integer array `data` representing bytes of data, return `true` if it is a valid UTF-8 encoding, where each integer represents 1 byte of data (only the lowest 8 bits are used).

### Example

```
Input: data = [235,140,4]
Output: false
```

### Constraints

- `1 <= data.length <= 2 * 10^4`
- `0 <= data[i] <= 255`

## Approach

Scan bytes one at a time, tracking how many continuation bytes (`10xxxxxx`) are still expected. When not mid-sequence, inspect the leading bits of the byte to determine whether it starts a 1-, 2-, 3-, or 4-byte character (or is invalid), setting the expected continuation count accordingly; while mid-sequence, verify each byte starts with `10` and decrement the remaining count.

## C# Solution

```csharp
public class Solution
{
    public bool ValidUtf8(int[] data)
    {
        int remainingBytes = 0;

        foreach (var num in data)
        {
            int b = num & 0xFF;

            if (remainingBytes == 0)
            {
                if ((b >> 3) == 0b11110) remainingBytes = 3;
                else if ((b >> 4) == 0b1110) remainingBytes = 2;
                else if ((b >> 5) == 0b110) remainingBytes = 1;
                else if ((b >> 7) == 0) remainingBytes = 0;
                else return false;
            }
            else
            {
                if ((b >> 6) != 0b10) return false;
                remainingBytes--;
            }
        }

        return remainingBytes == 0;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the bytes.
- **Space:** `O(1)`.
