# 2803. Maximum Strictly Increasing Cells in a Matrix

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Sorting, Memoization

## Problem

Given a 1-indexed `m × n` matrix `mat` of integers, you can move from cell `(row₁, col₁)` to cell `(row₂, col₂)` only if:

- `mat[row₁][col₁] < mat[row₂][col₂]`, and
- Either `row₁ == row₂` (same row) or `col₁ == col₂` (same column)

Return the maximum number of cells you can visit starting from any cell.

### Example

```
Input: mat = [[3,1],[3,4]]
Output: 2
Explanation: Starting from (1,2) with value 1, move to (2,2) with value 4. Total: 2 cells.
```

## Approach

This problem requires dynamic programming with careful ordering:

1. Create a list of all cells with their values and positions.
2. Sort cells by value in ascending order.
3. For each row and column, maintain the maximum path length ending in that row/column.
4. Process cells in sorted order: for each cell, the maximum path through it is 1 + max(row_max, col_max) where row_max and col_max are the best paths in that row and column from smaller values.
5. After processing a cell, update the row and column maximums.
6. Track the global maximum across all cells.

The key is processing cells by value order so that when we process a cell, all cells with smaller values have already been processed.

## C# Solution

```csharp
public class Solution
{
    public int MaxIncreasingCells(int[][] mat)
    {
        int m = mat.Length;
        int n = mat[0].Length;
        
        var cells = new List<(int value, int row, int col)>();
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                cells.Add((mat[i][j], i, j));
            }
        }
        
        cells.Sort((a, b) => a.value.CompareTo(b.value));
        
        var rowMax = new int[m];
        var colMax = new int[n];
        int result = 1;
        
        int i = 0;
        while (i < cells.Count)
        {
            int j = i;
            var updates = new List<(int row, int col, int val)>();
            
            while (j < cells.Count && cells[j].value == cells[i].value)
            {
                int row = cells[j].row;
                int col = cells[j].col;
                int maxPath = 1 + Math.Max(rowMax[row], colMax[col]);
                updates.Add((row, col, maxPath));
                result = Math.Max(result, maxPath);
                j++;
            }
            
            foreach (var (row, col, val) in updates)
            {
                rowMax[row] = Math.Max(rowMax[row], val);
                colMax[col] = Math.Max(colMax[col], val);
            }
            
            i = j;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(mn log(mn)) for sorting all cells
- **Space:** O(mn) for storing all cells and tracking row/column maximums
