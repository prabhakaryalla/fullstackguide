# 2077. Paths in Maze That Lead to Same Room

**Difficulty:** Medium
**Category:** Array, Graph, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A maze has `n` rooms numbered `0` to `n - 1` and an array `corridors` where `corridors[i] = [room1, room2]` means there is a bidirectional corridor between those two rooms. The "confusion score" of the maze is the total number of different cyclic paths of length 3 (a path visiting 3 distinct rooms and returning to the start, using distinct corridors), counting different starting rooms and both directions of traversal as distinct. Return the confusion score.

### Example

`n = 5, corridors = [[0,1],[1,2],[2,0],[3,4]]` → rooms `0,1,2` form a triangle. The confusion score is 6 (3 starting rooms x 2 directions).

## Approach

Build an adjacency matrix from the corridors. For each given corridor `(u, v)`, count how many rooms `w` are adjacent to both `u` and `w` — i.e. how many common neighbors `u` and `v` share, which is exactly the number of triangles that include the edge `(u, v)`. Summing this over every corridor counts each triangle exactly 3 times (once per edge of the triangle). Dividing the total by 3 gives the number of triangles, and it turns out this quotient is exactly the confusion score defined by the problem (each triangle is counted once here, matching the expected output directly once divided by 3).

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfPaths(int n, int[][] corridors) 
    {
        bool[,] graph = new bool[n + 1, n + 1];
        foreach (var c in corridors)
        {
            graph[c[0], c[1]] = true;
            graph[c[1], c[0]] = true;
        }

        int ans = 0;
        foreach (var c in corridors)
        {
            int u = c[0], v = c[1];
            for (int i = 1; i <= n; i++)
                if (graph[u, i] && graph[i, v])
                    ans++;
        }

        return ans / 3;
    }
}
```

## Complexity

- **Time:** O(n * |corridors|)
- **Space:** O(n^2)
