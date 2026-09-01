# 490. The Maze

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Depth-First Search, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `maze` represented by a binary grid (`0` empty, `1` wall), a ball `start` position, and a `destination`, where the ball rolls continuously in a direction until hitting a wall, return `true` if the ball can stop exactly at the destination.

### Example

```
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: true
```

### Constraints

- `1 <= m, n <= 100`

## Approach

Treat each "resting position" (a cell where the ball stops after rolling) as a node in a graph, reachable from other resting positions by rolling in one of the four directions until hitting a wall or the grid boundary. Perform a breadth-first search from the start position, computing each roll's final stopping cell by advancing step by step in the chosen direction while the next cell is open, and enqueue any newly discovered stopping cell. If the destination is ever reached exactly as a stopping cell, return `true`.

## C# Solution

```csharp
public class Solution
{
    public bool HasPath(int[][] maze, int[] start, int[] destination)
    {
        int rows = maze.Length, cols = maze[0].Length;
        var visited = new bool[rows, cols];
        var queue = new Queue<(int Row, int Col)>();
        queue.Enqueue((start[0], start[1]));
        visited[start[0], start[1]] = true;

        int[][] directions = { new[] { -1, 0 }, new[] { 1, 0 }, new[] { 0, -1 }, new[] { 0, 1 } };

        while (queue.Count > 0)
        {
            var (row, col) = queue.Dequeue();
            if (row == destination[0] && col == destination[1]) return true;

            foreach (var dir in directions)
            {
                int r = row, c = col;
                while (r + dir[0] >= 0 && r + dir[0] < rows && c + dir[1] >= 0 && c + dir[1] < cols
                    && maze[r + dir[0]][c + dir[1]] == 0)
                {
                    r += dir[0];
                    c += dir[1];
                }

                if (!visited[r, c])
                {
                    visited[r, c] = true;
                    queue.Enqueue((r, c));
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * max(rows, cols))`.
- **Space:** `O(rows * cols)` for the visited grid and queue.
