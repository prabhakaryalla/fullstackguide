# 3537. Fill a Special Grid

**Difficulty:** Medium
**Category:** Array, Divide and Conquer, Matrix

## Problem
Given an integer `n`, construct a `2^n x 2^n` grid filled with the integers `0` to `2^(2n) - 1`, each used exactly once, following this recursive "special" rule:
- If `n == 0`, the grid is simply `[[0]]`.
- Otherwise, split the `2^n x 2^n` grid into four `2^(n-1) x 2^(n-1)` quadrants. Fill them, in this order, with **consecutive** ranges of integers: the **top-right** quadrant first, then the **bottom-right** quadrant, then the **bottom-left** quadrant, then the **top-left** quadrant — each quadrant itself recursively arranged as a smaller special grid (offset by its starting value).

Return the resulting `2^n x 2^n` grid.

### Example
For `n = 1`, the grid is `[[4,0],[3,3]]`... more precisely the four `1x1` quadrants are filled in order top-right=`0`, bottom-right=`1`, bottom-left=`2`, top-left=`3`, giving `[[3,0],[2,1]]`.

## Approach
Implement a recursive `Fill(grid, rowStart, rowEnd, colStart, colEnd, ref counter)` helper:
- Base case: when the region is a single cell, assign it the next available integer (`counter++`).
- Recursive case: compute the row and column midpoints, then recurse into the four quadrants **in the required order** — top-right, bottom-right, bottom-left, top-left — each call consuming the next contiguous block of integers from the shared `counter`.

## C# Solution

```csharp
public class Solution {
    public int[][] SpecialGrid(int n) {
        int size = 1 << n;
        var grid = new int[size][];
        for (int i = 0; i < size; i++) grid[i] = new int[size];

        int count = 0;
        Fill(grid, 0, size, 0, size, ref count);
        return grid;
    }

    private void Fill(int[][] grid, int rowStart, int rowEnd, int colStart, int colEnd, ref int count) {
        if (rowEnd - rowStart == 1) {
            grid[rowStart][colStart] = count++;
            return;
        }

        int midRow = (rowStart + rowEnd) / 2;
        int midCol = (colStart + colEnd) / 2;

        Fill(grid, rowStart, midRow, midCol, colEnd, ref count);   // top-right
        Fill(grid, midRow, rowEnd, midCol, colEnd, ref count);     // bottom-right
        Fill(grid, midRow, rowEnd, colStart, midCol, ref count);   // bottom-left
        Fill(grid, rowStart, midRow, colStart, midCol, ref count); // top-left
    }
}
```

## Complexity

- **Time:** O(4^n) to fill every cell of the `2^n x 2^n` grid exactly once
- **Space:** O(4^n) for the output grid (O(n) additional recursion depth)
