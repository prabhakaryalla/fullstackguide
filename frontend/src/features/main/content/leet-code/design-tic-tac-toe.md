# 348. Design Tic-Tac-Toe

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a Tic-Tac-Toe game played on an `n x n` board between two players. Implement the `TicTacToe` class with a `Move(row, col, player)` method that records a move and returns the winning player's id (or `0` if no one has won yet).

### Example

```
Input:
["TicTacToe", "move", "move", "move", "move", "move", "move", "move"]
[[3], [0, 0, 1], [0, 2, 2], [2, 2, 1], [1, 1, 2], [2, 0, 1], [1, 0, 2], [2, 1, 1]]
Output:
[null, 0, 0, 0, 0, 0, 0, 1]
```

### Constraints

- `2 <= n <= 100`
- `player` is `1` or `2`.
- At most `n^2` calls will be made to `Move`.

## Approach

Rather than storing the full board and scanning it after every move, maintain running tallies per row, per column, per main diagonal, and per anti-diagonal. Each move adds `+1` (for player 1) or `-1` (for player 2) to the relevant tallies; a player wins the moment any tally reaches `±n` in magnitude, which can be checked in constant time after each move.

## C# Solution

```csharp
public class TicTacToe
{
    private readonly int[] rows;
    private readonly int[] cols;
    private int diagonal;
    private int antiDiagonal;
    private readonly int n;

    public TicTacToe(int n)
    {
        this.n = n;
        rows = new int[n];
        cols = new int[n];
    }

    public int Move(int row, int col, int player)
    {
        int delta = player == 1 ? 1 : -1;

        rows[row] += delta;
        cols[col] += delta;

        if (row == col) diagonal += delta;
        if (row + col == n - 1) antiDiagonal += delta;

        if (Math.Abs(rows[row]) == n || Math.Abs(cols[col]) == n
            || Math.Abs(diagonal) == n || Math.Abs(antiDiagonal) == n)
        {
            return player;
        }

        return 0;
    }
}
```

## Complexity

- **Time:** `O(1)` per `Move` call.
- **Space:** `O(n)` for the row and column tallies.
