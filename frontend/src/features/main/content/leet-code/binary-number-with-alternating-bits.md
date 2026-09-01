# 693. Binary Number with Alternating Bits

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

Given a positive integer `n`, return `true` if its binary representation has alternating bits — no two adjacent bits are the same.

### Example

```
Input: n = 5
Output: true
Explanation: 5 is "101" in binary.
```

### Constraints

- `1 <= n <= 2^31 - 1`

## Approach

XOR `n` with itself right-shifted by one bit. If the bits truly alternate, every bit of this XOR result becomes `1` up to the highest set bit, producing a value of the form `0...0111...1`. Such a value has the property that ANDing it with itself plus one yields zero (a classic check for "all ones" bit patterns).

## C# Solution

```csharp
public class Solution
{
    public bool HasAlternatingBits(int n)
    {
        int xored = n ^ (n >> 1);
        return (xored & (xored + 1)) == 0;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
