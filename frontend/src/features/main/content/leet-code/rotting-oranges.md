# 994. Rotting Oranges

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given a grid where each cell is `0` (empty), `1` (fresh orange), or `2` (rotten orange), every minute any fresh orange adjacent (4-directionally) to a rotten orange also becomes rotten. Return the minimum number of minutes until no fresh orange remains, or `-1` if that's impossible.

### Example

```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

## Approach

Seed a multi-source BFS with all initially rotten oranges, and count the fresh oranges. Process the queue level by level (each level representing one minute), rotting any fresh neighbor and decrementing the fresh counter. The number of levels processed is the answer, unless fresh oranges remain unreachable, in which case return `-1`.

## C# Solution

```csharp
public class Solution
{
    private static readonly (int, int)[] Directions = { (0, 1), (0, -1), (1, 0), (-1, 0) };

    public int OrangesRotting(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var queue = new Queue<(int, int)>();
        int fresh = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 2) queue.Enqueue((r, c));
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;

        int minutes = 0;

        while (queue.Count > 0 && fresh > 0)
        {
            int size = queue.Count;

            for (int i = 0; i < size; i++)
            {
                var (r, c) = queue.Dequeue();

                foreach (var (dr, dc) in Directions)
                {
                    int nr = r + dr, nc = c + dc;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] != 1) continue;

                    grid[nr][nc] = 2;
                    fresh--;
                    queue.Enqueue((nr, nc));
                }
            }

            minutes++;
        }

        return fresh == 0 ? minutes : -1;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the queue.
