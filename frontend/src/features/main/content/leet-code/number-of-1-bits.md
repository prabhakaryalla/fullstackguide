# 191. Number of 1 Bits

**Difficulty:** Easy
**Category:** Divide and Conquer, Bit Manipulation

## Problem

Given a 32-bit unsigned integer, return the number of `1` bits it has (its Hamming weight).

### Example

```
n = 00000000000000000000000000001011 -> 3
```

## Approach

Repeatedly clear the lowest set bit using the `n & (n - 1)` trick (subtracting 1 flips the lowest set bit and everything below it, so ANDing with the original clears exactly that one bit), counting how many times this can be done until `n` becomes zero. This runs in time proportional to the number of set bits rather than always looping 32 times.

## C# Solution

```csharp
public class Solution
{
    public int HammingWeight(uint n)
    {
        int count = 0;

        while (n != 0)
        {
            n &= n - 1; // clear the lowest set bit
            count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(k)` — where `k` is the number of set bits (at most 32).
- **Space:** `O(1)`.
