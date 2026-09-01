# 779. K-th Symbol in Grammar

**Difficulty:** Medium
**Category:** Math, Bit Manipulation, Recursion

## Problem

A sequence of rows is built starting with row 1 as `"0"`, where each subsequent row is formed by replacing every `0` in the previous row with `01`, and every `1` with `10`. Given `n` and `k`, return the `k`-th symbol (1-indexed) in row `n`.

### Example

```
Input: n = 2, k = 2
Output: 1
```

## Approach

The `k`-th symbol (0-indexed as `k0 = k - 1`) in row `n` equals the parity of the number of `1` bits in the binary representation of `k0` — this is because each bit of `k0` determines, at each level of recursive expansion, whether the current value gets flipped (a `1` bit) or copied (a `0` bit) relative to its parent in the previous row. Compute this by repeatedly checking the lowest bit of `k0` and flipping a running result each time it's `1`, then shifting right.

## C# Solution

```csharp
public class Solution
{
    public int KthGrammar(int n, int k)
    {
        int result = 0;
        k--;

        while (k > 0)
        {
            if ((k & 1) == 1)
                result ^= 1;

            k >>= 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(log k)`.
- **Space:** `O(1)`.
