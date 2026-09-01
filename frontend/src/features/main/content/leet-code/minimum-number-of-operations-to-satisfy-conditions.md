# 3122. Minimum Number of Operations to Satisfy Conditions

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

You are given an `m x n` integer matrix `grid` of single digits (`0`-`9`). In one operation you may change any single cell's value. Return the minimum number of operations so that every column is constant (all cells in a column share the same value), and no two **adjacent** columns share the same value.

## Approach

For each column, precompute how many cells already hold each of the 10 possible digit values — changing a column to value `v` costs `(column height) - (count of v in that column)`. Then use memoized recursion column by column: `Solve(j, prev)` returns the minimum cost to fix columns `j..n-1`, given that column `j-1` was set to value `prev`. At each column, try every digit `0..9` except `prev` (columns must differ from their immediate left neighbor), paying that digit's conversion cost plus the best result for the rest.

## C# Solution

```csharp
public class Solution {
    public int MinimumOperations(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;
        int[][] count = new int[n][];
        for (int j = 0; j < n; j++)
            count[j] = new int[10];

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                count[j][grid[i][j]]++;

        int[,] mem = new int[n, 10];
        for (int j = 0; j < n; j++)
            for (int k = 0; k < 10; k++)
                mem[j, k] = -1;

        return Solve(count, 0, 0, m, mem);
    }

    // Returns the minimum operations to fix columns j..n-1, given that column
    // j - 1 (if any) was set to value `prev`.
    private int Solve(int[][] count, int j, int prev, int m, int[,] mem) {
        if (j == count.Length)
            return 0;
        if (mem[j, prev] != -1)
            return mem[j, prev];

        int res = int.MaxValue;
        for (int num = 0; num < 10; num++)
            if (j == 0 || num != prev)
                res = Math.Min(res, m - count[j][num] + Solve(count, j + 1, num, m, mem));

        return mem[j, prev] = res;
    }
}
```

## Complexity

- Time: O(m * n + n * 10 * 10) — building the per-column counts, then the bounded DP over columns and digits.
- Space: O(n * 10) — the count table and memoization table.
