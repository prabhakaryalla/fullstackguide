# 499. The Maze III

**Difficulty:** Hard
**Category:** Array, String, Breadth-First Search, Depth-First Search, Matrix, Heap
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `maze`, a `ball` start position, and a `hole` position, where the ball rolls until hitting a wall or falling into the hole, return the shortest path (as a string of direction letters `u`, `d`, `l`, `r`) for the ball to fall into the hole. If there are multiple shortest paths, return the lexicographically smallest one; if none exists, return `"impossible"`.

### Example

```
Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], ball = [4,3], hole = [0,1]
Output: "lul"
```

## Approach

Run a Dijkstra-style search over "resting positions," where the priority queue orders states first by total distance traveled, then lexicographically by the path string so far (ensuring ties resolve to the smallest path). For each direction, roll step by step until hitting a wall, the boundary, or the hole itself (stopping immediately if the hole is passed through, since the ball falls in). Update a stopping cell's best known `(distance, path)` only when strictly improved by either metric.

## C# Solution

```csharp
public class Solution
{
    public string FindShortestWay(int[][] maze, int[] ball, int[] hole)
    {
        int rows = maze.Length, cols = maze[0].Length;
        var directions = new (int Dr, int Dc, char Label)[]
        {
            (-1, 0, 'u'), (0, -1, 'l'), (0, 1, 'r'), (1, 0, 'd')
        };

        var distance = new int[rows, cols];
        var path = new string[rows, cols];
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                distance[r, c] = int.MaxValue;

        distance[ball[0], ball[1]] = 0;
        path[ball[0], ball[1]] = "";

        var heap = new PriorityQueue<(int Row, int Col), (int Dist, string Path)>(
            Comparer<(int Dist, string Path)>.Create((a, b) =>
                a.Dist != b.Dist ? a.Dist - b.Dist : string.CompareOrdinal(a.Path, b.Path)));

        heap.Enqueue((ball[0], ball[1]), (0, ""));

        while (heap.Count > 0)
        {
            var (row, col) = heap.Dequeue();
            int currentDist = distance[row, col];
            string currentPath = path[row, col];

            if (row == hole[0] && col == hole[1])
                return currentPath;

            foreach (var (dr, dc, label) in directions)
            {
                int r = row, c = col, steps = 0;

                while (true)
                {
                    int nr = r + dr, nc = c + dc;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || maze[nr][nc] == 1) break;

                    r = nr; c = nc; steps++;

                    if (r == hole[0] && c == hole[1]) break;
                }

                int newDist = currentDist + steps;
                string newPath = currentPath + label;

                if (newDist < distance[r, c] || (newDist == distance[r, c] && string.CompareOrdinal(newPath, path[r, c]) < 0))
                {
                    distance[r, c] = newDist;
                    path[r, c] = newPath;
                    heap.Enqueue((r, c), (newDist, newPath));
                }
            }
        }

        return "impossible";
    }
}
```

## Complexity

- **Time:** `O(rows * cols * max(rows, cols) * log(rows * cols))`.
- **Space:** `O(rows * cols)` for the distance and path grids.
