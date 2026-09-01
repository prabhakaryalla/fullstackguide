# 476. Number Complement

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

Given a positive integer `num`, return its complement — flipping every bit within `num`'s minimal binary representation (ignoring leading zeros beyond its highest set bit).

### Example

```
Input: num = 5
Output: 2
Explanation: 5 is "101" in binary, and its complement is "010" = 2.
```

### Constraints

- `1 <= num <= 2^31 - 1`

## Approach

Build a mask of all 1s exactly as wide as `num`'s binary representation by repeatedly shifting a bit left and OR-ing it in until the mask meets or exceeds `num`. XOR-ing `num` with this mask flips every relevant bit while leaving higher, non-existent bits untouched.

## C# Solution

```csharp
public class Solution
{
    public int FindComplement(int num)
    {
        int mask = 1;
        while (mask < num)
            mask = (mask << 1) | 1;

        return num ^ mask;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
