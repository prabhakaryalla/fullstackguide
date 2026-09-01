# 1680. Concatenation of Consecutive Binary Numbers

**Difficulty:** Medium
**Category:** Math, Bit Manipulation

## Problem

Given an integer `n`, return the decimal value of the binary string formed by concatenating the binary representations of `1` to `n` in order, modulo `10^9 + 7`.

### Example

```
Input: n = 3
Output: 27
Explanation: "1" + "10" + "11" = "11011" = 27.
```

## Approach

Build the result iteratively: for each `i` from `1` to `n`, shift the accumulated result left by `i`'s bit length (equivalent to appending `i`'s binary digits) and add `i`, taking the modulus at every step to keep values bounded.

## C# Solution

```csharp
public class Solution
{
    public int ConcatenatedBinary(int n)
    {
        const int Mod = 1_000_000_007;
        long result = 0;

        for (int i = 1; i <= n; i++)
        {
            int bitLength = (int)Math.Floor(Math.Log2(i)) + 1;
            result = ((result << bitLength) % Mod + i) % Mod;
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
