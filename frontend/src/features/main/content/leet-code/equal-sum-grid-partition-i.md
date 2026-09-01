# 3546. Equal Sum Grid Partition I

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum, Enumeration

## Problem
You are given an `m x n` grid of integers. Determine whether it is possible to split the grid into exactly two non-empty parts using a **single horizontal or vertical cut** (dividing the rows into a contiguous top block and bottom block, or the columns into a contiguous left block and right block) such that the sum of all elements in the first part equals the sum of all elements in the second part. Return `true` if possible, `false` otherwise.

### Example
Input: `grid = [[1,4],[2,3]]` → Cutting horizontally after row 0: top sum `= 1+4 = 5`, bottom sum `= 2+3 = 5`. Output: `true`.

## Approach
Compute the total sum of the grid. Then:
1. Scan rows top to bottom, accumulating a running sum; if at any row boundary the running sum equals exactly half the total, a valid horizontal cut exists.
2. Transpose the grid and repeat the same running-sum check over "rows" of the transposed grid, which corresponds to scanning columns of the original grid — if a running sum equals half the total, a valid vertical cut exists.

Return `true` if either check succeeds.

## C# Solution

```csharp
public class Solution {
    public bool CanPartitionGrid(int[][] grid) {
        long totalSum = 0;
        foreach (int[] row in grid)
            foreach (int val in row)
                totalSum += val;

        return CanPartition(grid, totalSum) || CanPartition(Transpose(grid), totalSum);
    }

    private bool CanPartition(int[][] lines, long totalSum) {
        long runningSum = 0;
        foreach (int[] line in lines) {
            foreach (int val in line) runningSum += val;
            if (runningSum * 2 == totalSum) return true;
        }
        return false;
    }

    private int[][] Transpose(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;
        var res = new int[n][];
        for (int j = 0; j < n; j++) res[j] = new int[m];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                res[j][i] = grid[i][j];
        return res;
    }
}
```

## Complexity

- **Time:** O(m * n) for computing the total sum and both running-sum scans
- **Space:** O(m * n) for the transposed grid
