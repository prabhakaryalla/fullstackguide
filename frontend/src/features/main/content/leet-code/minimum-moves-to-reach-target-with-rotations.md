# 1210. Minimum Moves to Reach Target with Rotations

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Matrix

## Problem

A `1x2` snake starts occupying cells `(0,0)` and `(0,1)` in an `n x n` grid (`0` free, `1` blocked) and must reach cells `(n-1,n-2)` and `(n-1,n-1)`. Each move slides the snake right or down (if the destination cells are free) or rotates it clockwise between horizontal and vertical orientation (if the two cells below it, when horizontal, are free). Return the minimum number of moves, or `-1` if unreachable.

### Example

```
Input: grid = [[0,0,0,0,0,1],
               [1,1,0,0,1,0],
               [0,0,0,0,1,1],
               [0,0,1,0,1,0],
               [0,1,1,0,0,0],
               [0,1,1,0,0,0]]
Output: 11
```

## Approach

Model each snake state as `(row, col, horizontal)`, where `(row, col)` is the top-left occupied cell and `horizontal` indicates orientation. Run a breadth-first search from the start state, generating valid right-slide, down-slide, and rotation transitions (each checked against grid bounds and blocked cells), and stop as soon as the target state (horizontal, at `(n-1, n-2)`) is dequeued — BFS guarantees this is reached in the minimum number of moves.

## C# Solution

```csharp
public class Solution
{
    public int MinimumMoves(int[][] grid)
    {
        int n = grid.Length;
        bool IsFree(int r, int c) => r < n && c < n && grid[r][c] == 0;

        var visited = new HashSet<(int, int, int)> { (0, 0, 1) };
        var queue = new Queue<(int Row, int Col, int Horizontal, int Moves)>();
        queue.Enqueue((0, 0, 1, 0));

        while (queue.Count > 0)
        {
            var (r, c, horizontal, moves) = queue.Dequeue();

            if (horizontal == 1 && r == n - 1 && c == n - 2) return moves;
            if (horizontal == 0 && r == n - 2 && c == n - 1) return moves;

            var next = new List<(int, int, int)>();

            if (horizontal == 1)
            {
                if (IsFree(r, c + 2)) next.Add((r, c + 1, 1));
                if (IsFree(r + 1, c) && IsFree(r + 1, c + 1))
                {
                    next.Add((r + 1, c, 1));
                    next.Add((r, c, 0));
                }
            }
            else
            {
                if (IsFree(r + 2, c)) next.Add((r + 1, c, 0));
                if (IsFree(r, c + 1) && IsFree(r + 1, c + 1))
                {
                    next.Add((r, c + 1, 0));
                    next.Add((r, c, 1));
                }
            }

            foreach (var state in next)
            {
                if (visited.Add(state))
                    queue.Enqueue((state.Item1, state.Item2, state.Item3, moves + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n^2)`, bounded by the number of distinct `(row, col, orientation)` states.
- **Space:** `O(n^2)` for the visited set and queue.
