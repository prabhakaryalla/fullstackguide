# 3700. Number of ZigZag Arrays II

**Difficulty:** Hard
**Category:** Math, Dynamic Programming

## Problem

You are given three integers `n`, `l`, and `r`.

A ZigZag array of length `n` is defined as follows:

- Each element lies in the range `[l, r]`.
- No two adjacent elements are equal.
- No three consecutive elements form a strictly increasing or strictly decreasing sequence.

Return the total number of valid ZigZag arrays, modulo `10^9 + 7`.

### Example

```
Input: n = 3, l = 4, r = 5
Output: 2
Explanation: The only valid arrays are [4,5,4] and [5,4,5].
```

### Constraints

- `3 <= n <= 10^9`
- `1 <= l < r <= 75`

## Approach

This is the same recurrence as the smaller-constraint version, but `n` is now far too large to iterate step by step. Instead, encode the DP state as a vector of length `2m` (where `m = r - l + 1`): the first `m` entries represent "next move must be down" for each value, and the next `m` represent "next move must be up". Build a `2m x 2m` transition matrix `T` where entry `T[y][m + x] = 1` whenever `x < y` (captures `newDown[y] += dpUp[x]`), and `T[m + y][x] = 1` whenever `x > y` (captures `newUp[y] += dpDown[x]`). Raise `T` to the power `n - 1` using fast matrix exponentiation, apply it to the all-ones initial vector (representing length-1 sequences), and sum the resulting vector's entries.

## C# Solution

```csharp
public class Solution
{
    private const long MOD = 1_000_000_007;
    private int size;

    public int ZigZagArrays(int n, int l, int r)
    {
        int m = r - l + 1;
        size = 2 * m;

        long[][] transition = BuildTransitionMatrix(m);
        long[][] resultMatrix = MatrixPower(transition, n - 1);

        long[] initial = new long[size];
        for (int i = 0; i < size; i++) initial[i] = 1;

        long[] finalVector = MultiplyMatrixVector(resultMatrix, initial);

        long total = 0;
        for (int i = 0; i < size; i++)
        {
            total = (total + finalVector[i]) % MOD;
        }

        return (int)total;
    }

    private long[][] BuildTransitionMatrix(int m)
    {
        long[][] t = CreateMatrix();

        for (int y = 0; y < m; y++)
        {
            for (int x = 0; x < y; x++)
            {
                t[y][m + x] = 1;
            }
        }

        for (int y = 0; y < m; y++)
        {
            for (int x = y + 1; x < m; x++)
            {
                t[m + y][x] = 1;
            }
        }

        return t;
    }

    private long[][] CreateMatrix()
    {
        long[][] mat = new long[size][];
        for (int i = 0; i < size; i++) mat[i] = new long[size];
        return mat;
    }

    private long[][] MatrixMultiply(long[][] a, long[][] b)
    {
        long[][] result = CreateMatrix();
        for (int i = 0; i < size; i++)
        {
            for (int k = 0; k < size; k++)
            {
                if (a[i][k] == 0) continue;
                for (int j = 0; j < size; j++)
                {
                    result[i][j] = (result[i][j] + a[i][k] * b[k][j]) % MOD;
                }
            }
        }
        return result;
    }

    private long[][] MatrixPower(long[][] matrix, int power)
    {
        long[][] result = CreateMatrix();
        for (int i = 0; i < size; i++) result[i][i] = 1;

        long[][] baseMatrix = matrix;
        while (power > 0)
        {
            if ((power & 1) == 1)
            {
                result = MatrixMultiply(result, baseMatrix);
            }
            baseMatrix = MatrixMultiply(baseMatrix, baseMatrix);
            power >>= 1;
        }

        return result;
    }

    private long[] MultiplyMatrixVector(long[][] matrix, long[] vector)
    {
        long[] result = new long[size];
        for (int i = 0; i < size; i++)
        {
            long sum = 0;
            for (int j = 0; j < size; j++)
            {
                sum = (sum + matrix[i][j] * vector[j]) % MOD;
            }
            result[i] = sum;
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O(m^3 log n)` for matrix exponentiation.
- **Space:** `O(m^2)`.
