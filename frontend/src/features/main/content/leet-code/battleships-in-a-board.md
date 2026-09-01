# 419. Battleships in a Board

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem

Given an `m x n` matrix `board` where `'X'` represents part of a battleship and `'.'` represents empty water, return the number of battleships. Battleships are placed horizontally or vertically, at least one cell apart, and no two battleships are adjacent.

### Example

```
Input: board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]
Output: 2
```

### Constraints

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 200`

## Approach

Since battleships never touch, only count an `'X'` as the start of a new battleship if it has no `'X'` immediately above it or immediately to its left — this uniquely identifies the top-left cell of every ship without needing to trace its full extent.

## C# Solution

```csharp
public class Solution
{
    public int CountBattleships(char[][] board)
    {
        int rows = board.Length, cols = board[0].Length;
        int count = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (board[r][c] != 'X') continue;
                if (r > 0 && board[r - 1][c] == 'X') continue;
                if (c > 0 && board[r][c - 1] == 'X') continue;

                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(1)`.
