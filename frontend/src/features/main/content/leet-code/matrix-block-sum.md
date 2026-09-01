# 1314. Matrix Block Sum

**Difficulty:** Medium
**Category:** Matrix, Prefix Sum

## Problem

Given a matrix `mat` and an integer `k`, return a matrix `answer` where `answer[i][j]` is the sum of all `mat[r][c]` with `|r - i| <= k` and `|c - j| <= k`, clipped to the matrix bounds.

### Example

```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]
```

## Approach

Build a 2D prefix sum table so any rectangular sum can be computed in constant time. For each cell, clamp the `k`-radius block to the matrix bounds and read the block's sum directly from the prefix sum table.

## C# Solution

```csharp
public class Solution
{
    public int[][] MatrixBlockSum(int[][] mat, int k)
    {
        int m = mat.Length, n = mat[0].Length;
        var prefix = new int[m + 1, n + 1];

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                prefix[i + 1, j + 1] = mat[i][j] + prefix[i, j + 1] + prefix[i + 1, j] - prefix[i, j];
            }
        }

        var answer = new int[m][];
        for (int i = 0; i < m; i++)
        {
            answer[i] = new int[n];
            for (int j = 0; j < n; j++)
            {
                int r1 = Math.Max(0, i - k), c1 = Math.Max(0, j - k);
                int r2 = Math.Min(m - 1, i + k), c2 = Math.Min(n - 1, j + k);

                answer[i][j] = prefix[r2 + 1, c2 + 1] - prefix[r1, c2 + 1] - prefix[r2 + 1, c1] + prefix[r1, c1];
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m * n)` for the prefix sum table.
