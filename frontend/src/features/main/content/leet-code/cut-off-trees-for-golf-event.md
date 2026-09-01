# 675. Cut Off Trees for Golf Event

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given a `forest` grid where `0` is an obstacle, `1` is walkable grass, and a value `> 1` is a tree of that height, cut down all trees in order from shortest to tallest, starting from `(0, 0)`, and return the minimum total steps needed, or `-1` if any tree is unreachable.

### Example

```
Input: forest = [[1,2,3],[0,0,4],[7,6,5]]
Output: 6
```

## Approach

Collect all tree positions and sort them by height, since trees must be cut in that exact order. Starting from `(0, 0)`, repeatedly run a breadth-first search to find the shortest path from the current position to the next shortest tree, accumulating the step count; if any tree is unreachable, return `-1` immediately. After reaching each tree, it becomes the new starting position for finding the next one.

## C# Solution

```csharp
public class Solution
{
    public int CutOffTree(IList<IList<int>> forest)
    {
        int rows = forest.Count, cols = forest[0].Count;
        var trees = new List<(int Height, int Row, int Col)>();

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (forest[r][c] > 1)
                    trees.Add((forest[r][c], r, c));

        trees.Sort();

        int totalSteps = 0;
        int currentRow = 0, currentCol = 0;

        foreach (var (height, row, col) in trees)
        {
            int steps = Bfs(forest, currentRow, currentCol, row, col, rows, cols);
            if (steps == -1) return -1;

            totalSteps += steps;
            currentRow = row;
            currentCol = col;
        }

        return totalSteps;
    }

    private int Bfs(IList<IList<int>> forest, int startRow, int startCol, int targetRow, int targetCol, int rows, int cols)
    {
        if (startRow == targetRow && startCol == targetCol) return 0;

        var visited = new bool[rows, cols];
        var queue = new Queue<(int Row, int Col, int Steps)>();
        queue.Enqueue((startRow, startCol, 0));
        visited[startRow, startCol] = true;

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        while (queue.Count > 0)
        {
            var (row, col, steps) = queue.Dequeue();

            foreach (var dir in directions)
            {
                int nr = row + dir[0], nc = col + dir[1];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr, nc] || forest[nr][nc] == 0) continue;

                if (nr == targetRow && nc == targetCol) return steps + 1;

                visited[nr, nc] = true;
                queue.Enqueue((nr, nc, steps + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O((rows * cols)^2)` — a BFS of size `O(rows * cols)` for each of up to `O(rows * cols)` trees.
- **Space:** `O(rows * cols)` for the visited grid and queue.
