# 2022. Convert 1D Array Into 2D Array

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

Given a 0-indexed 1D integer array `original` and two integers `m` and `n`, create an `m x n` 2D array using all the elements of `original` in row-major order. If it is impossible to form such an array (i.e. `original.Length != m * n`), return an empty 2D array.

## Approach

First check that `original.Length == m * n`; if not, return an empty array immediately. Otherwise, for each output row `i`, copy the contiguous slice `original[i * n .. i * n + n - 1]` into that row.

## C# Solution

```csharp
public class Solution
{
    public int[][] Construct2DArray(int[] original, int m, int n)
    {
        if (original.Length != m * n) return Array.Empty<int[]>();

        var result = new int[m][];
        for (int i = 0; i < m; i++)
        {
            result[i] = new int[n];
            Array.Copy(original, i * n, result[i], 0, n);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m * n)` for the output array (not counting the required output).
