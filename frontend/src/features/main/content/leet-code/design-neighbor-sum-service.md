# 3242. Design Neighbor Sum Service

**Difficulty:** Medium
**Category:** Array, Design, Hash Table, Matrix, Simulation

## Problem
Design a data structure initialized with an `n x n` grid of distinct integers. Support two operations: `AdjacentSum(value)`, returning the sum of the up/down/left/right neighbors of the cell containing `value`, and `DiagonalSum(value)`, returning the sum of the four diagonal neighbors of that cell.

## Approach
Precompute a lookup from each value to its `(row, col)` position in the grid during construction. For each query, look up the value's position, then check each of the 4 relevant neighboring offsets (orthogonal for adjacent sum, diagonal for diagonal sum), summing the grid values at any offsets that remain within grid bounds.

## C# Solution
```csharp
public class NeighborSum {
    private readonly int n;
    private readonly int[][] grid;
    private readonly (int, int)[] numToPos;

    public NeighborSum(int[][] grid) {
        this.n = grid.Length;
        this.grid = grid;
        numToPos = new (int, int)[n * n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                numToPos[grid[i][j]] = (i, j);
    }

    public int AdjacentSum(int value) {
        (int i, int j) = numToPos[value];
        int sum = 0;
        int[][] offsets = new int[][] { new[] { -1, 0 }, new[] { 1, 0 }, new[] { 0, -1 }, new[] { 0, 1 } };
        foreach (int[] o in offsets) {
            int x = i + o[0], y = j + o[1];
            if (x >= 0 && x < n && y >= 0 && y < n)
                sum += grid[x][y];
        }
        return sum;
    }

    public int DiagonalSum(int value) {
        (int i, int j) = numToPos[value];
        int sum = 0;
        int[][] offsets = new int[][] { new[] { -1, -1 }, new[] { -1, 1 }, new[] { 1, -1 }, new[] { 1, 1 } };
        foreach (int[] o in offsets) {
            int x = i + o[0], y = j + o[1];
            if (x >= 0 && x < n && y >= 0 && y < n)
                sum += grid[x][y];
        }
        return sum;
    }
}
```

## Complexity
- Time: O(m*n) constructor, O(1) per query
- Space: O(m*n)
