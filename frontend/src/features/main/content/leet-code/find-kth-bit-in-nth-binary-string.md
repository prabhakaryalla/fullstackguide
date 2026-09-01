# 1545. Find Kth Bit in Nth Binary String

**Difficulty:** Medium
**Category:** String, Recursion, Simulation

## Problem

A sequence of binary strings is defined as: `S1 = "0"`, and `Si = S(i-1) + "1" + reverse(invert(S(i-1)))` for `i > 1`. Given `n` and `k`, return the `k`-th bit (1-indexed) of `Sn`.

### Example

```
Input: n = 4, k = 11
Output: "1"
```

## Approach

`Sn` has length `2^n - 1`, with the middle bit always `'1'`. Recurse: if `k` is exactly the middle position, return `'1'`. If `k` falls in the first half, it is identical to the same position in `S(n-1)`, so recurse with `n - 1` unchanged `k`. If `k` falls in the second half, it corresponds to a mirrored and inverted position in `S(n-1)` — recompute `k` as `length - k + 1` reflected around the middle and flip the resulting bit.

## C# Solution

```csharp
public class Solution
{
    public char FindKthBit(int n, int k)
    {
        return Solve(n, k);
    }

    private char Solve(int n, int k)
    {
        if (n == 1)
        {
            return '0';
        }

        int length = (1 << n) - 1;
        int mid = length / 2 + 1;

        if (k == mid)
        {
            return '1';
        }

        if (k < mid)
        {
            return Solve(n - 1, k);
        }

        char bit = Solve(n - 1, length - k + 1);
        return bit == '0' ? '1' : '0';
    }
}
```

## Complexity

- **Time:** `O(n)` — recursion depth reduces `n` by one each call.
- **Space:** `O(n)` for the recursion stack.
