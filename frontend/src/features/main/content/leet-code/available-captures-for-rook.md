# 999. Available Captures for Rook

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

Given an 8x8 chessboard with one white rook (`'R'`), some white bishops (`'B'`), some black pawns (`'p'`), and empty squares (`'.'`), return the number of black pawns the rook can capture in one move (the rook moves in a straight line until blocked by a bishop or the edge of the board).

### Example

```
Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
Output: 3
```

## Approach

Locate the rook, then scan outward from it in each of the four directions one square at a time, stopping as soon as a bishop or the board edge is hit. If a pawn is encountered before that, it's capturable — count it and stop scanning that direction.

## C# Solution

```csharp
public class Solution
{
    public int NumRookCaptures(char[][] board)
    {
        int rookRow = 0, rookCol = 0;

        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++)
                if (board[r][c] == 'R') { rookRow = r; rookCol = c; }

        int captures = 0;
        var directions = new (int, int)[] { (0, 1), (0, -1), (1, 0), (-1, 0) };

        foreach (var (dr, dc) in directions)
        {
            int r = rookRow + dr, c = rookCol + dc;

            while (r >= 0 && r < 8 && c >= 0 && c < 8)
            {
                if (board[r][c] == 'B') break;
                if (board[r][c] == 'p') { captures++; break; }
                r += dr;
                c += dc;
            }
        }

        return captures;
    }
}
```

## Complexity

- **Time:** `O(1)` — fixed 8x8 board.
- **Space:** `O(1)`.
