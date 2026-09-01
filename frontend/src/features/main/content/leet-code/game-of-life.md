# 289. Game of Life

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

Given an `m x n` board where each cell is either `1` (live) or `0` (dead), update the board to its next state according to Conway's Game of Life rules, in place: a live cell with fewer than two or more than three live neighbors dies; a live cell with two or three live neighbors survives; a dead cell with exactly three live neighbors becomes alive.

### Example

```
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

## Approach

Since each cell's next state depends on its neighbors' *current* state, use extra encoding to update in place without an auxiliary board: use `2` to mean "was live, now dead" and `3` to mean "was dead, now live". After computing the next state for every cell using these temporary codes (checking `cell == 1 || cell == 2` for "was live"), do a final pass dividing every value by... actually simpler: map `2 -> 0` and `3 -> 1` in the final pass.

## C# Solution

```csharp
public class Solution
{
    public void GameOfLife(int[][] board)
    {
        int m = board.Length, n = board[0].Length;

        for (int r = 0; r < m; r++)
        {
            for (int c = 0; c < n; c++)
            {
                int liveNeighbors = CountLiveNeighbors(board, r, c, m, n);

                if (board[r][c] == 1 && (liveNeighbors < 2 || liveNeighbors > 3))
                    board[r][c] = 2; // was live, now dead
                else if (board[r][c] == 0 && liveNeighbors == 3)
                    board[r][c] = 3; // was dead, now live
            }
        }

        for (int r = 0; r < m; r++)
        {
            for (int c = 0; c < n; c++)
            {
                board[r][c] = board[r][c] == 2 ? 0 : board[r][c] == 3 ? 1 : board[r][c];
            }
        }
    }

    private int CountLiveNeighbors(int[][] board, int row, int col, int m, int n)
    {
        int count = 0;
        for (int dr = -1; dr <= 1; dr++)
        {
            for (int dc = -1; dc <= 1; dc++)
            {
                if (dr == 0 && dc == 0) continue;
                int nr = row + dr, nc = col + dc;
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if (board[nr][nc] == 1 || board[nr][nc] == 2) count++;
            }
        }
        return count;
    }
}
```

## Complexity

- **Time:** `O(m * n)` — each cell examines a constant number of neighbors.
- **Space:** `O(1)` — updated in place using encoded states.
