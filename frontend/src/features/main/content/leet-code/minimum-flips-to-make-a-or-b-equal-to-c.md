# 1318. Minimum Flips to Make a OR b Equal to c

**Difficulty:** Medium
**Category:** Bit Manipulation

## Problem

Given three integers `a`, `b`, and `c`, return the minimum number of bit flips in `a` and `b` needed so that `a OR b == c`.

### Example

```
Input: a = 2, b = 6, c = 5
Output: 3
```

## Approach

Inspect each bit position independently. If the target bit in `c` is `1` but both corresponding bits in `a` and `b` are `0`, one flip is required. If the target bit in `c` is `0`, every set bit among `a` and `b` at that position must be flipped off, costing one flip per set bit.

## C# Solution

```csharp
public class Solution
{
    public int MinFlips(int a, int b, int c)
    {
        int flips = 0;

        for (int i = 0; i < 32; i++)
        {
            int bitA = (a >> i) & 1;
            int bitB = (b >> i) & 1;
            int bitC = (c >> i) & 1;

            if (bitC == 1)
            {
                if (bitA == 0 && bitB == 0) flips++;
            }
            else
            {
                flips += bitA + bitB;
            }
        }

        return flips;
    }
}
```

## Complexity

- **Time:** `O(1)` — exactly 32 bit positions.
- **Space:** `O(1)`.
