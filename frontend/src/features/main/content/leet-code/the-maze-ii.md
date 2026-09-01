# 505. The Maze II

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Depth-First Search, Matrix, Heap
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `maze`, a `start` position, and a `destination`, where the ball rolls until hitting a wall, return the shortest distance for the ball to stop exactly at the destination, or `-1` if impossible.

### Example

```
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: 12
```

## Approach

Run Dijkstra's algorithm over "resting positions," since each roll's distance can vary and the shortest overall distance to a stopping point isn't necessarily found via plain BFS. From each stopping position popped off the priority queue (ordered by accumulated distance), roll in all four directions until hitting a wall, and relax the distance to that new stopping cell if the accumulated path is shorter than previously recorded.

## C# Solution

```csharp
public class Solution
{
    public int ShortestDistance(int[][] maze, int[] start, int[] destination)
    {
        int rows = maze.Length, cols = maze[0].Length;
        var distance = new int[rows, cols];
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                distance[r, c] = int.MaxValue;

        distance[start[0], start[1]] = 0;

        var heap = new PriorityQueue<(int Row, int Col), int>();
        heap.Enqueue((start[0], start[1]), 0);

        int[][] directions = { new[] { -1, 0 }, new[] { 1, 0 }, new[] { 0, -1 }, new[] { 0, 1 } };

        while (heap.Count > 0)
        {
            var (row, col) = heap.Dequeue();
            int currentDist = distance[row, col];

            foreach (var dir in directions)
            {
                int r = row, c = col, steps = 0;

                while (r + dir[0] >= 0 && r + dir[0] < rows && c + dir[1] >= 0 && c + dir[1] < cols
                    && maze[r + dir[0]][c + dir[1]] == 0)
                {
                    r += dir[0];
                    c += dir[1];
                    steps++;
                }

                if (currentDist + steps < distance[r, c])
                {
                    distance[r, c] = currentDist + steps;
                    heap.Enqueue((r, c), distance[r, c]);
                }
            }
        }

        int result = distance[destination[0], destination[1]];
        return result == int.MaxValue ? -1 : result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * max(rows, cols) * log(rows * cols))`.
- **Space:** `O(rows * cols)` for the distance grid.
