# 342. Power of Four

**Difficulty:** Easy
**Category:** Math, Bit Manipulation

## Problem

Given an integer `n`, return `true` if it is a power of four. Otherwise, return `false`.

### Example

```
Input: n = 16
Output: true
```

### Constraints

- `-2^31 <= n <= 2^31 - 1`

## Approach

A power of four must first be a power of two (exactly one bit set, checked with `n & (n - 1) == 0`). Among powers of two, powers of four have their single set bit at an even position, which can be verified by masking against `0x55555555` (bits at positions 0, 2, 4, ...).

## C# Solution

```csharp
public class Solution
{
    public bool IsPowerOfFour(int n)
    {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
