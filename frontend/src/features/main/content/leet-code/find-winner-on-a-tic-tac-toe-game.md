# 1275. Find Winner on a Tic Tac Toe Game

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

Two players, `A` and `B`, alternately mark a `3x3` Tic-Tac-Toe board (`A` goes first) with moves given as `[row, col]` pairs in order. Return `"A"` or `"B"` if that player has won, `"Draw"` if the board is full with no winner, or `"Pending"` if the game hasn't finished.

### Example

```
Input: moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]
Output: "A"
```

## Approach

Replay the moves onto a `3x3` grid, marking `+1` for `A`'s moves and `-1` for `B`'s (alternating by move index). After placing all moves, check every row sum, column sum, and both diagonal sums: a sum of `+3` means `A` won that line, and `-3` means `B` won. If no line reaches `±3`, the result is `"Draw"` if all 9 cells were filled, otherwise `"Pending"`.

## C# Solution

```csharp
public class Solution
{
    public string Tictactoe(int[][] moves)
    {
        var board = new int[3, 3];

        for (int i = 0; i < moves.Length; i++)
        {
            int player = i % 2 == 0 ? 1 : -1;
            board[moves[i][0], moves[i][1]] = player;
        }

        for (int i = 0; i < 3; i++)
        {
            int rowSum = board[i, 0] + board[i, 1] + board[i, 2];
            int colSum = board[0, i] + board[1, i] + board[2, i];

            if (Math.Abs(rowSum) == 3) return rowSum == 3 ? "A" : "B";
            if (Math.Abs(colSum) == 3) return colSum == 3 ? "A" : "B";
        }

        int diag1 = board[0, 0] + board[1, 1] + board[2, 2];
        int diag2 = board[0, 2] + board[1, 1] + board[2, 0];

        if (Math.Abs(diag1) == 3) return diag1 == 3 ? "A" : "B";
        if (Math.Abs(diag2) == 3) return diag2 == 3 ? "A" : "B";

        return moves.Length == 9 ? "Draw" : "Pending";
    }
}
```

## Complexity

- **Time:** `O(1)` — the board size is fixed at `3x3`.
- **Space:** `O(1)`.
