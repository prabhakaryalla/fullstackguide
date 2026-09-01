# 529. Minesweeper

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix

## Problem

Given a Minesweeper `board` (`'M'` for unrevealed mine, `'E'` for unrevealed empty square, and revealed digits/blanks) and a `click` position, reveal the clicked square and apply the standard Minesweeper reveal rules, then return the updated board.

### Example

```
Input: board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]
Output: [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
```

### Constraints

- `1 <= board.length, board[i].length <= 50`

## Approach

If the click lands on a mine, mark it as exploded (`'X'`) and stop. Otherwise, recursively reveal squares starting from the clicked one: count adjacent mines among the 8 surrounding cells; if any mines are adjacent, mark the count and stop expanding from that cell; if none are adjacent, mark it as blank (`'B'`) and recursively reveal all 8 neighbors, which naturally floods outward until reaching cells bordering mines.

## C# Solution

```csharp
public class Solution
{
    private static readonly int[][] Directions =
    {
        new[] { -1, -1 }, new[] { -1, 0 }, new[] { -1, 1 },
        new[] { 0, -1 }, new[] { 0, 1 },
        new[] { 1, -1 }, new[] { 1, 0 }, new[] { 1, 1 }
    };

    public char[][] UpdateBoard(char[][] board, int[] click)
    {
        int row = click[0], col = click[1];

        if (board[row][col] == 'M')
        {
            board[row][col] = 'X';
            return board;
        }

        Reveal(board, row, col);
        return board;
    }

    private void Reveal(char[][] board, int row, int col)
    {
        int rows = board.Length, cols = board[0].Length;
        if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] != 'E') return;

        int mineCount = 0;
        foreach (var dir in Directions)
        {
            int nr = row + dir[0], nc = col + dir[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] == 'M')
                mineCount++;
        }

        if (mineCount > 0)
        {
            board[row][col] = (char)('0' + mineCount);
            return;
        }

        board[row][col] = 'B';
        foreach (var dir in Directions)
            Reveal(board, row + dir[0], col + dir[1]);
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the recursion stack in the worst case.
