# 1267. Count Servers that Communicate

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem

Given an `m x n` grid where `1` marks a server, two servers can communicate if they share the same row or the same column. Return the number of servers that can communicate with at least one other server.

### Example

```
Input: grid = [[1,0],[0,1]]
Output: 0
```

## Approach

Precompute how many servers exist in each row and each column. A server communicates with another exactly when its row has more than one server or its column has more than one server. Scan the grid once to build the row/column counts, then scan again, counting any server whose row count or column count exceeds `1`.

## C# Solution

```csharp
public class Solution
{
    public int CountServers(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var rowCount = new int[rows];
        var colCount = new int[cols];

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == 1)
                {
                    rowCount[r]++;
                    colCount[c]++;
                }

        int result = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == 1 && (rowCount[r] > 1 || colCount[c] > 1))
                    result++;

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows + cols)`.
