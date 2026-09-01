# 1905. Count Sub Islands

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem

Given two `m x n` binary matrices `grid1` and `grid2` (islands are groups of `1`s connected 4-directionally), an island in `grid2` is a "sub-island" if every cell of that island is also land (`1`) in `grid1`. Return the number of islands in `grid2` that are sub-islands.

### Example

```
Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],
       grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: Three islands in grid2 have every land cell also present as land in grid1.
```

### Constraints

- `m == grid1.length == grid2.length`
- `n == grid1[i].length == grid2[i].length`
- `1 <= m, n <= 500`
- `grid1[i][j]` and `grid2[i][j]` are either `0` or `1`.

## Approach

Flood-fill (DFS/BFS) each island in `grid2`. While traversing an island, track whether every visited cell is also land in `grid1`; if any cell fails, the island is not a sub-island. Mark visited cells to avoid recounting and count only the islands that pass the check entirely.

## C# Solution

```csharp
public class Solution
{
    private int[][] _grid1;
    private int[][] _grid2;
    private int _rows, _cols;

    public int CountSubIslands(int[][] grid1, int[][] grid2)
    {
        _grid1 = grid1;
        _grid2 = grid2;
        _rows = grid2.Length;
        _cols = grid2[0].Length;
        int count = 0;

        for (int r = 0; r < _rows; r++)
        {
            for (int c = 0; c < _cols; c++)
            {
                if (_grid2[r][c] == 1)
                {
                    if (Dfs(r, c)) count++;
                }
            }
        }

        return count;
    }

    private bool Dfs(int r, int c)
    {
        if (r < 0 || r >= _rows || c < 0 || c >= _cols || _grid2[r][c] == 0)
        {
            return true;
        }

        _grid2[r][c] = 0;
        bool isSub = _grid1[r][c] == 1;

        bool up = Dfs(r - 1, c);
        bool down = Dfs(r + 1, c);
        bool left = Dfs(r, c - 1);
        bool right = Dfs(r, c + 1);

        return isSub && up && down && left && right;
    }
}
```

## Complexity

- **Time:** `O(m * n)` — every cell is visited at most once.
- **Space:** `O(m * n)` for the recursion stack in the worst case.
