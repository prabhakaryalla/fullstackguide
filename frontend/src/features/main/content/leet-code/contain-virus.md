# 749. Contain Virus

**Difficulty:** Hard
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix, Simulation

## Problem

Given a grid where `1` marks a virus-infected cell and `0` marks an uninfected cell, each round the virus threatens to spread from every infected region to its adjacent uninfected cells; you may build walls around exactly one region per round (the one threatening the most uninfected cells) to permanently contain it, while every other region spreads by one cell. Return the total number of walls used until the virus stops spreading.

### Example

```
Input: isInfected = [[1,1,1,0,0,0,0,0,0],[1,0,1,0,0,0,0,0,0],[1,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,1,1]]
Output: 13
```

## Approach

Each round, find every connected infected region via DFS/BFS, recording for each region the set of distinct uninfected cells it threatens (its "frontier") and the number of perimeter edges bordering uninfected cells (the walls needed to fully enclose it). Choose the region with the largest frontier to quarantine — mark it permanently as walled (using a special value) and add its wall count to the running total. Every other region spreads: its threatened frontier cells become newly infected. Repeat until no region threatens any uninfected cell.

## C# Solution

```csharp
public class Solution
{
    public int ContainVirus(int[][] isInfected)
    {
        int rows = isInfected.Length, cols = isInfected[0].Length;
        int totalWalls = 0;

        while (true)
        {
            var visited = new bool[rows, cols];
            var regions = new List<HashSet<(int, int)>>();
            var frontiers = new List<HashSet<(int, int)>>();
            var wallCounts = new List<int>();

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    if (isInfected[r][c] == 1 && !visited[r, c])
                    {
                        var region = new HashSet<(int, int)>();
                        var frontier = new HashSet<(int, int)>();

                        int wallCount = ExploreRegion(isInfected, r, c, visited, region, frontier);

                        regions.Add(region);
                        frontiers.Add(frontier);
                        wallCounts.Add(wallCount);
                    }
                }
            }

            if (regions.Count == 0) break;

            int maxIndex = 0;
            for (int i = 1; i < regions.Count; i++)
                if (frontiers[i].Count > frontiers[maxIndex].Count)
                    maxIndex = i;

            if (frontiers[maxIndex].Count == 0) break;

            totalWalls += wallCounts[maxIndex];

            for (int i = 0; i < regions.Count; i++)
            {
                if (i == maxIndex)
                {
                    foreach (var (r, c) in regions[i])
                        isInfected[r][c] = 2;
                }
                else
                {
                    foreach (var (r, c) in frontiers[i])
                        isInfected[r][c] = 1;
                }
            }
        }

        return totalWalls;
    }

    private int ExploreRegion(int[][] isInfected, int startR, int startC, bool[,] visited, HashSet<(int, int)> region, HashSet<(int, int)> frontier)
    {
        int rows = isInfected.Length, cols = isInfected[0].Length;
        int wallCount = 0;
        var stack = new Stack<(int, int)>();
        stack.Push((startR, startC));
        visited[startR, startC] = true;

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        while (stack.Count > 0)
        {
            var (r, c) = stack.Pop();
            region.Add((r, c));

            foreach (var dir in directions)
            {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

                if (isInfected[nr][nc] == 0)
                {
                    frontier.Add((nr, nc));
                    wallCount++;
                }
                else if (isInfected[nr][nc] == 1 && !visited[nr, nc])
                {
                    visited[nr, nc] = true;
                    stack.Push((nr, nc));
                }
            }
        }

        return wallCount;
    }
}
```

## Complexity

- **Time:** `O((rows * cols)^2)` in the worst case, since each round can take `O(rows * cols)` and there can be up to `O(rows * cols)` rounds.
- **Space:** `O(rows * cols)` for the visited grid and region tracking.
