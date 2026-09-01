# 723. Candy Crush

**Difficulty:** Medium
**Category:** Array, Two Pointers, Matrix, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` integer board representing a Candy Crush game, simulate the crushing and falling process until the board stabilizes (no more matches of 3+ same-valued candies in a row or column), and return the final stable board.

### Example

```
Input: board = [[110,5,112,113,114],[210,211,5,213,214],[310,311,3,313,314],[410,411,412,5,414],[5,1,512,3,3],[610,4,1,613,614],[710,1,2,713,714],[810,1,2,1,1],[1,1,2,2,2],[4,1,4,4,1014]]
Output: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[110,0,0,0,114],[210,0,0,0,214],[310,0,0,113,314],[410,0,0,213,414],[610,211,112,313,614],[710,311,412,613,714],[810,411,512,713,1014]]
```

## Approach

Repeat the crush-and-fall cycle until a full pass finds nothing left to crush. Each cycle first scans every row and column for three or more consecutive cells with the same absolute value (using absolute value in case a cell is already marked for removal, though marking uses a separate boolean grid so this doesn't conflict), marking all such cells. If any marks were made, zero them all out, then apply gravity per column by compacting non-zero values downward and filling the vacated top cells with zeros.

## C# Solution

```csharp
public class Solution
{
    public int[][] CandyCrush(int[][] board)
    {
        int rows = board.Length, cols = board[0].Length;
        bool changed = true;

        while (changed)
        {
            changed = false;
            var toCrush = new bool[rows, cols];

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c + 2 < cols; c++)
                {
                    int val = Math.Abs(board[r][c]);
                    if (val != 0 && val == Math.Abs(board[r][c + 1]) && val == Math.Abs(board[r][c + 2]))
                    {
                        toCrush[r, c] = toCrush[r, c + 1] = toCrush[r, c + 2] = true;
                        changed = true;
                    }
                }
            }

            for (int c = 0; c < cols; c++)
            {
                for (int r = 0; r + 2 < rows; r++)
                {
                    int val = Math.Abs(board[r][c]);
                    if (val != 0 && val == Math.Abs(board[r + 1][c]) && val == Math.Abs(board[r + 2][c]))
                    {
                        toCrush[r, c] = toCrush[r + 1, c] = toCrush[r + 2, c] = true;
                        changed = true;
                    }
                }
            }

            if (changed)
            {
                for (int r = 0; r < rows; r++)
                    for (int c = 0; c < cols; c++)
                        if (toCrush[r, c])
                            board[r][c] = 0;

                for (int c = 0; c < cols; c++)
                {
                    int writeRow = rows - 1;
                    for (int r = rows - 1; r >= 0; r--)
                    {
                        if (board[r][c] != 0)
                        {
                            board[writeRow][c] = board[r][c];
                            writeRow--;
                        }
                    }

                    for (int r = writeRow; r >= 0; r--)
                        board[r][c] = 0;
                }
            }
        }

        return board;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` per cycle, with at most `O(rows * cols)` total cycles.
- **Space:** `O(rows * cols)` for the crush-marking grid.
