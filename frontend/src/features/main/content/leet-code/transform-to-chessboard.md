# 782. Transform to Chessboard

**Difficulty:** Hard
**Category:** Array, Math, Bit Manipulation, Matrix

## Problem

Given an `n x n` binary `board`, you may swap any two rows or any two columns any number of times. Return the minimum number of swaps needed to transform the board into a valid chessboard pattern (adjacent cells always differ), or `-1` if impossible.

### Example

```
Input: board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
Output: 2
```

## Approach

First validate feasibility: every 2x2 corner (formed by any two rows and any two columns) must XOR to zero, meaning the entire board is fully determined by its first row and first column patterns; also, the first row and first column must each contain a balanced count of `0`s and `1`s (differing by at most one). If valid, count how many positions in the first column already match an alternating `0,1,0,1...` pattern (`rowSwap`) and similarly for the first row (`colSwap`). For odd `n`, if the count is odd, use its complement instead (since either alternating pattern is acceptable); for even `n`, take the smaller of the count and its complement. Each swap fixes two mismatched positions, so divide the sum of adjusted counts by two for the final answer.

## C# Solution

```csharp
public class Solution
{
    public int MovesToChessboard(int[][] board)
    {
        int n = board.Length;

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if ((board[0][0] ^ board[r][0] ^ board[0][c] ^ board[r][c]) != 0)
                    return -1;
            }
        }

        int rowSum = 0, colSum = 0, rowSwap = 0, colSwap = 0;

        for (int i = 0; i < n; i++)
        {
            rowSum += board[0][i];
            colSum += board[i][0];

            if (board[i][0] == i % 2) rowSwap++;
            if (board[0][i] == i % 2) colSwap++;
        }

        if (rowSum != n / 2 && rowSum != (n + 1) / 2) return -1;
        if (colSum != n / 2 && colSum != (n + 1) / 2) return -1;

        if (n % 2 == 1)
        {
            if (rowSwap % 2 == 1) rowSwap = n - rowSwap;
            if (colSwap % 2 == 1) colSwap = n - colSwap;
        }
        else
        {
            rowSwap = Math.Min(rowSwap, n - rowSwap);
            colSwap = Math.Min(colSwap, n - colSwap);
        }

        return (rowSwap + colSwap) / 2;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` extra.
