# 717. 1-bit and 2-bit Characters

**Difficulty:** Easy
**Category:** Array

## Problem

Given a binary array `bits` that ends with `0`, where characters are encoded as either a single bit `0`, or two bits `10` or `11`, return `true` if the last character in `bits` must be a one-bit character.

### Example

```
Input: bits = [1,0,0]
Output: true
```

### Constraints

- `1 <= bits.length <= 1000`
- `bits[i]` is `0` or `1`.
- `bits[bits.length - 1] == 0`

## Approach

Scan from the start, greedily consuming one bit if it's `0`, or two bits if it's `1` (since a leading `1` always starts a two-bit character). Since the array always ends in `0`, tracking the position reached exactly at the final index reveals whether that last `0` was consumed alone (a one-bit character) or as the second bit of a two-bit character.

## C# Solution

```csharp
public class Solution
{
    public bool IsOneBitCharacter(int[] bits)
    {
        int i = 0;
        int n = bits.Length;

        while (i < n - 1)
        {
            i += bits[i] == 0 ? 1 : 2;
        }

        return i == n - 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
