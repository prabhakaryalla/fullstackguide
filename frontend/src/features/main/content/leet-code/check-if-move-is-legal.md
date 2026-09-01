# 1958. Check if Move is Legal

**Difficulty:** Medium
**Category:** Array, Matrix, Enumeration

## Problem

On an 8x8 board of characters `'W'` (white), `'B'` (black), or `'.'` (empty), placing a new piece of `color` at `(rr, cc)` (currently `'.'`) is legal if it forms at least one straight line (any of 8 directions) that starts with the opposite color, continues with one or more of the opposite color, and ends with a piece of `color`. Return `true` if the move is legal.

### Example

```
Input: board = [[".",".",".","B",".",".",".","."], ... ], rr = 4, cc = 3, color = "B"
Output: true
Explanation: In some direction, a contiguous run of opposite-colored 'W' pieces ends with a 'B' piece.
```

### Constraints

- `board.length == board[r].length == 8`
- `board[r][c]` is `'W'`, `'B'`, or `'.'`.
- `0 <= rr, cc <= 7`
- `board[rr][cc] == '.'`
- `color` is `"W"` or `"B"`.

## Approach

For each of the 8 directions, walk outward from `(rr, cc)` counting how many consecutive cells of the opposite color are encountered; the move is legal for that direction if, after at least one such opposite-color cell, the walk reaches a cell of `color` (still on the board) before running off the board or hitting an empty cell. Check all 8 directions and return `true` if any succeeds.

## C# Solution

```csharp
public class Solution
{
    public bool CheckMove(char[][] board, int rr, int cc, char color)
    {
        int[] dr = { -1, -1, -1, 0, 0, 1, 1, 1 };
        int[] dc = { -1, 0, 1, -1, 1, -1, 0, 1 };
        char opposite = color == 'W' ? 'B' : 'W';

        for (int dir = 0; dir < 8; dir++)
        {
            int r = rr + dr[dir], c = cc + dc[dir];
            int count = 0;

            while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] == opposite)
            {
                r += dr[dir];
                c += dc[dir];
                count++;
            }

            if (count > 0 && r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] == color)
            {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by 8 directions times at most 8 cells each on a fixed 8x8 board.
- **Space:** `O(1)`.
