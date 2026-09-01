# 1009. Complement of Base 10 Integer

**Difficulty:** Easy
**Category:** Math, Bit Manipulation

## Problem

The complement of an integer is the integer you get when you flip all the `0`s to `1`s and all the `1`s to `0`s in its binary representation. Given an integer `n`, return its complement.

### Example

```
Input: n = 5
Output: 2
Explanation: 5 is "101" in binary, complement is "010" = 2.
```

## Approach

Build a mask of all-1 bits that matches the bit-length of `n` by repeatedly shifting left and setting the low bit until the mask is at least as large as `n`. XOR-ing `n` with this mask flips exactly the bits within `n`'s bit-length, producing the complement. `n = 0` is a special case since its bit-length is considered to be 1, giving a complement of `1`.

## C# Solution

```csharp
public class Solution
{
    public int BitwiseComplement(int n)
    {
        if (n == 0) return 1;

        int mask = 1;
        while (mask < n) mask = (mask << 1) | 1;

        return mask ^ n;
    }
}
```

## Complexity

- **Time:** `O(log n)` to build the mask.
- **Space:** `O(1)`.
