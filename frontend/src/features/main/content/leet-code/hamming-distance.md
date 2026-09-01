# 461. Hamming Distance

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

Given two integers `x` and `y`, return the Hamming distance between them — the number of positions at which the corresponding bits differ.

### Example

```
Input: x = 1, y = 4
Output: 2
```

### Constraints

- `0 <= x, y <= 2^31 - 1`

## Approach

XOR the two numbers together; every bit set to `1` in the result marks a position where the original bits differed. Count the set bits in that XOR result.

## C# Solution

```csharp
public class Solution
{
    public int HammingDistance(int x, int y)
    {
        int xorValue = x ^ y;
        int distance = 0;

        while (xorValue != 0)
        {
            distance += xorValue & 1;
            xorValue >>= 1;
        }

        return distance;
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by the fixed 32-bit integer width.
- **Space:** `O(1)`.
