# 2220. Minimum Bit Flips to Convert Number

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

A bit flip of a number `x` is choosing a bit in the binary representation of `x` and flipping it from either 0 to 1 or 1 to 0.

Given two integers `start` and `goal`, return the minimum number of bit flips to convert `start` to `goal`.

### Example

```
Input: start = 10, goal = 7
Output: 3
Explanation:
10 = 1010 in binary
7  = 0111 in binary
Need to flip 3 bits: positions 0, 1, and 3.
```

## Approach

The number of bit flips needed equals the number of differing bits between `start` and `goal` — the Hamming distance. XOR the two numbers to get a value with a `1` at every position where they differ, then count the set bits in that result.

## C# Solution

```csharp
public class Solution
{
    public int MinBitFlips(int start, int goal)
    {
        return System.Numerics.BitOperations.PopCount((uint)(start ^ goal));
    }
}
```

## Complexity

- **Time:** `O(1)` for 32-bit integers.
- **Space:** `O(1)`.

