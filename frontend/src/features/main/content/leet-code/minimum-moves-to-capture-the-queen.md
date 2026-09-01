# 3001. Minimum Moves to Capture The Queen

**Difficulty:** Medium
**Category:** Math, Enumeration

## Problem

You are given a `1`-indexed `8 x 8` chessboard with three pieces on it: a white rook at `(a, b)`, a white bishop at `(c, d)`, and a black queen at `(e, f)`. Only the white pieces may move, and the queen never moves. Return the minimum number of moves needed for either white piece to capture the queen.

- The rook moves any number of squares horizontally or vertically but cannot jump over another piece.
- The bishop moves any number of squares diagonally but cannot jump over another piece.
- A piece captures the queen if it can move onto the queen's square in one move.

### Example

```
Input: a = 1, b = 1, c = 8, d = 8, e = 2, f = 3
Output: 2
Explanation: Neither piece attacks the queen directly, so the rook needs two moves: (1,1) -> (1,3) -> (2,3).

Input: a = 5, b = 3, c = 3, d = 4, e = 5, f = 2
Output: 1
Explanation: The rook already shares row 5 with the queen and nothing blocks the path, so it captures in one move.
```

## Approach

The queen is captured in one move whenever the rook shares its row/column with the queen, or the bishop shares a diagonal with the queen — as long as the *other* white piece is not sitting between the attacker and the queen. Check the four cases directly:

1. Rook shares a row with the queen (`a == e`): blocked only if the bishop is on the same row and strictly between them.
2. Rook shares a column with the queen (`b == f`): blocked only if the bishop is on the same column and strictly between them.
3. Bishop shares an up-diagonal with the queen (`c + d == e + f`): blocked only if the rook is on the same diagonal and strictly between them.
4. Bishop shares a down-diagonal with the queen (`c - d == e - f`): blocked only if the rook is on the same diagonal and strictly between them.

If none of these direct captures is available, the rook can always reposition to line up with the queen in one move and capture on the next, so the answer is `2`.

## C# Solution

```csharp
public class Solution {
    public int MinMovesToCaptureTheQueen(int a, int b, int c, int d, int e, int f) {
        // Rook and queen share a row; bishop can only block if it's on that row too.
        if (a == e)
            return (c == a && Math.Min(b, f) < d && d < Math.Max(b, f)) ? 2 : 1;
        // Rook and queen share a column; bishop can only block if it's on that column too.
        if (b == f)
            return (d == b && Math.Min(a, e) < c && c < Math.Max(a, e)) ? 2 : 1;
        // Bishop and queen share an up-diagonal; rook can only block if it's on that diagonal too.
        if (c + d == e + f)
            return (a + b == c + d && Math.Min(c, e) < a && a < Math.Max(c, e)) ? 2 : 1;
        // Bishop and queen share a down-diagonal; rook can only block if it's on that diagonal too.
        if (c - d == e - f)
            return (a - b == c - d && Math.Min(c, e) < a && a < Math.Max(c, e)) ? 2 : 1;
        return 2;
    }
}
```

## Complexity

- Time: O(1) — a constant number of comparisons.
- Space: O(1) — no extra data structures.
