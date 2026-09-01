# 3549. Multiply Two Polynomials

**Difficulty:** Hard
**Category:** Array, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two integer arrays `poly1` and `poly2` representing two polynomials, where `poly1[i]` is the coefficient of `x^i` in the first polynomial and `poly2[j]` is the coefficient of `x^j` in the second polynomial. Return an array `result` representing the product polynomial, where `result[k]` is the coefficient of `x^k` in `poly1 * poly2`, each taken modulo `10^9 + 7`.

### Example

`poly1 = [1,2]` (represents `1 + 2x`), `poly2 = [3,4]` (represents `3 + 4x`).

Product: `(1 + 2x) * (3 + 4x) = 3 + 4x + 6x + 8x^2 = 3 + 10x + 8x^2`. So `result = [3, 10, 8]`.

## Approach

The product of a polynomial of degree `n - 1` and one of degree `m - 1` has `n + m - 1` coefficients. Compute `result[k]` as the sum, over all `i + j = k`, of `poly1[i] * poly2[j]`. Accumulate each coefficient using a `long` to avoid overflow, then reduce modulo `10^9 + 7` at the end.

## C# Solution

```csharp
public class Solution 
{
    public int[] MultiplyPolynomials(int[] poly1, int[] poly2) 
    {
        const long MOD = 1_000_000_007;
        int n = poly1.Length, m = poly2.Length;
        long[] result = new long[n + m - 1];

        for (int i = 0; i < n; i++)
        {
            if (poly1[i] == 0) continue;
            for (int j = 0; j < m; j++)
            {
                result[i + j] += (long)poly1[i] * poly2[j];
            }
        }

        int[] answer = new int[result.Length];
        for (int k = 0; k < result.Length; k++)
        {
            long value = result[k] % MOD;
            if (value < 0) value += MOD;
            answer[k] = (int)value;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n * m)
- **Space:** O(n + m)
