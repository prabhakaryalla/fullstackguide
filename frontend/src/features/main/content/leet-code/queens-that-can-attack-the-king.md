# 1222. Queens That Can Attack the King

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

On an `8x8` chessboard, given the positions of several queens and the position of the king, return the positions of the queens that can attack the king (a queen attacks along a row, column, or diagonal only if no other queen blocks the path).

### Example

```
Input: queens = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]], king = [0,0]
Output: [[0,1],[1,0],[3,3]]
```

## Approach

For each of the 8 possible attack directions from the king (horizontal, vertical, diagonal), walk outward one cell at a time until either stepping off the board or landing on a queen. The first queen encountered in a given direction is the only one that can attack the king along that line, since it blocks any queen further away.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> QueensAttacktheKing(int[][] queens, int[] king)
    {
        var queenSet = new HashSet<(int, int)>();
        foreach (var q in queens) queenSet.Add((q[0], q[1]));

        var directions = new (int Dr, int Dc)[]
        {
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1),  (1, 0),  (1, 1)
        };

        var result = new List<IList<int>>();

        foreach (var (dr, dc) in directions)
        {
            int r = king[0] + dr, c = king[1] + dc;
            while (r >= 0 && r < 8 && c >= 0 && c < 8)
            {
                if (queenSet.Contains((r, c)))
                {
                    result.Add(new List<int> { r, c });
                    break;
                }
                r += dr;
                c += dc;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` to build the queen set, plus `O(1)` for the fixed `8x8` scan.
- **Space:** `O(n)` for the queen set.
