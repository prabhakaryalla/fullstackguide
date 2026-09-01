# 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem

Given an `m x n` integer matrix `mat` and an integer `threshold`, return the largest side length of a square submatrix whose element sum is at most `threshold`, or `0` if no such square exists.

### Example

```
Input: mat = [[1,1,3,2,4,3,2]], threshold = 4
Output: 2
```

## Approach

Build a 2D prefix-sum table so the sum of any rectangular region can be computed in `O(1)`. Then, for every possible square side length (from `1` up to `min(rows, cols)`), scan all possible top-left positions and check whether that square's sum is within the threshold using the prefix sums; track the largest side length for which any valid position is found.

## C# Solution

```csharp
public class Solution
{
    public int MaxSideLength(int[][] mat, int threshold)
    {
        int rows = mat.Length, cols = mat[0].Length;
        var prefix = new int[rows + 1, cols + 1];

        for (int r = 1; r <= rows; r++)
            for (int c = 1; c <= cols; c++)
                prefix[r, c] = mat[r - 1][c - 1] + prefix[r - 1, c] + prefix[r, c - 1] - prefix[r - 1, c - 1];

        int SumRegion(int r1, int c1, int r2, int c2) =>
            prefix[r2, c2] - prefix[r1, c2] - prefix[r2, c1] + prefix[r1, c1];

        int best = 0;

        for (int size = 1; size <= Math.Min(rows, cols); size++)
        {
            for (int r = 0; r + size <= rows; r++)
            {
                for (int c = 0; c + size <= cols; c++)
                {
                    if (SumRegion(r, c, r + size, c + size) <= threshold)
                        best = Math.Max(best, size);
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * min(rows, cols))`.
- **Space:** `O(rows * cols)` for the prefix-sum table.
