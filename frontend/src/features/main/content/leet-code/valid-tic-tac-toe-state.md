# 794. Valid Tic-Tac-Toe State

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem

Given a `3x3` Tic-Tac-Toe `board` filled with `'X'`, `'O'`, or `' '`, return whether the board could have been reached by playing a valid game where `X` always moves first and players alternate.

### Example

```
Input: board = ["O  "," X "," X"]
Output: false
```

## Approach

Count the number of `X`s and `O`s: since `X` moves first, `O`'s count must equal either `X`'s count or be exactly one less. Then check whether `X` or `O` has a winning line. If `X` has won, `X` must have moved last, so `O`'s count must equal `X`'s count minus one; if `O` has won, `O` must have moved last, so the counts must be equal. Any board violating these constraints, or where both players have simultaneously won, is invalid.

## C# Solution

```csharp
public class Solution
{
    public bool ValidTicTacToe(string[] board)
    {
        int xCount = 0, oCount = 0;

        foreach (var row in board)
        {
            foreach (var c in row)
            {
                if (c == 'X') xCount++;
                else if (c == 'O') oCount++;
            }
        }

        if (oCount != xCount && oCount != xCount - 1) return false;

        bool xWins = Wins(board, 'X');
        bool oWins = Wins(board, 'O');

        if (xWins && oCount != xCount - 1) return false;
        if (oWins && oCount != xCount) return false;

        return true;
    }

    private bool Wins(string[] board, char player)
    {
        for (int i = 0; i < 3; i++)
        {
            if (board[i][0] == player && board[i][1] == player && board[i][2] == player) return true;
            if (board[0][i] == player && board[1][i] == player && board[2][i] == player) return true;
        }

        if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return true;
        if (board[0][2] == player && board[1][1] == player && board[2][0] == player) return true;

        return false;
    }
}
```

## Complexity

- **Time:** `O(1)` — the board is a fixed 3x3 size.
- **Space:** `O(1)` extra.
