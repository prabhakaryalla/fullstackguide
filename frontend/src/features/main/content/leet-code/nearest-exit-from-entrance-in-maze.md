# 1926. Nearest Exit from Entrance in Maze

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given an `m x n` maze grid of `'.'` (empty) and `'+'` (wall) cells and a starting `entrance` position, an exit is any empty border cell that is not the entrance. Return the minimum number of steps to reach the nearest exit from the entrance, moving up/down/left/right through empty cells, or `-1` if no exit is reachable.

### Example

```
Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
Output: 1
Explanation: Moving one step down from (1,2) to (2,2) leads to a border cell... actually moving right to (1,3) reaches the border in 1 step.
```

### Constraints

- `m == maze.length`
- `n == maze[i].length`
- `1 <= m, n <= 100`
- `maze[i][j]` is `'.'` or `'+'`.
- `entrance.length == 2`
- `maze[entrance[0]][entrance[1]] == '.'`

## Approach

Breadth-first search from `entrance`, treating it as distance `0` and marking it visited so it is never itself reported as an exit. At each BFS layer, expand to the four neighboring empty, unvisited cells; the first time a border cell (row `0`/`m-1` or column `0`/`n-1`) other than the entrance is dequeued, its BFS depth is the answer, since BFS explores in increasing distance order.

## C# Solution

```csharp
public class Solution
{
    public int NearestExit(char[][] maze, int[] entrance)
    {
        int rows = maze.Length, cols = maze[0].Length;
        var visited = new bool[rows, cols];
        var queue = new Queue<(int r, int c, int dist)>();
        queue.Enqueue((entrance[0], entrance[1], 0));
        visited[entrance[0], entrance[1]] = true;

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (r, c, dist) = queue.Dequeue();

            for (int k = 0; k < 4; k++)
            {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                if (visited[nr, nc] || maze[nr][nc] == '+') continue;

                if (nr == 0 || nr == rows - 1 || nc == 0 || nc == cols - 1)
                {
                    return dist + 1;
                }

                visited[nr, nc] = true;
                queue.Enqueue((nr, nc, dist + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(m * n)` — each cell is visited at most once.
- **Space:** `O(m * n)` for the visited grid and queue.
