# 311. Sparse Matrix Multiplication

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two sparse matrices `mat1` of size `m x k` and `mat2` of size `k x n`, return the result of `mat1 x mat2`, taking advantage of the fact that most entries are zero.

### Example

```
Input: mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]
Output: [[7,0,0],[-7,0,3]]
```

### Constraints

- `m == mat1.length`
- `k == mat1[i].length == mat2.length`
- `n == mat2[i].length`
- `1 <= m, k, n <= 100`

## Approach

Rather than computing every dot product term unconditionally, skip multiplications involving a zero factor: for each nonzero entry `mat1[i][j]`, only sweep across row `j` of `mat2`, adding `mat1[i][j] * mat2[j][l]` into the result whenever `mat2[j][l]` is also nonzero. This avoids wasted work on the many zero entries typical of sparse matrices.

## C# Solution

```csharp
public class Solution
{
    public int[][] MultiplySparse(int[][] mat1, int[][] mat2)
    {
        int m = mat1.Length, k = mat1[0].Length, n = mat2[0].Length;
        var result = new int[m][];
        for (int i = 0; i < m; i++)
            result[i] = new int[n];

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < k; j++)
            {
                if (mat1[i][j] == 0) continue;

                for (int l = 0; l < n; l++)
                {
                    if (mat2[j][l] != 0)
                        result[i][l] += mat1[i][j] * mat2[j][l];
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(m * k * n)` worst case, but much faster in practice since zero entries are skipped.
- **Space:** `O(m * n)` for the result matrix.
