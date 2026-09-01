# 190. Reverse Bits

**Difficulty:** Easy
**Category:** Divide and Conquer, Bit Manipulation

## Problem

Reverse the bits of a given 32-bit unsigned integer.

### Example

```
n = 00000010100101000001111010011100 -> 00111001011110000010100101000000
```

## Approach

Process all 32 bits one at a time: shift the result left to make room, then OR in the lowest bit of the remaining input `n`, then shift `n` right to expose its next bit. After 32 iterations, every input bit has been placed in its mirrored position in the result.

## C# Solution

```csharp
public class Solution
{
    public uint reverseBits(uint n)
    {
        uint result = 0;

        for (int i = 0; i < 32; i++)
        {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(1)` — always exactly 32 iterations.
- **Space:** `O(1)`.
