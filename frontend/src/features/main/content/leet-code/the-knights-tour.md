# 2664. The Knight's Tour

**Difficulty:** Medium
**Category:** Array, Backtracking, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a board of size `m x n` and a starting cell `(r, c)`, a knight begins at `(r, c)` and must visit every cell exactly once using standard knight moves (a knight's tour). Among all valid complete tours, return the lexicographically smallest one, formatted as a space-separated sequence of `"row_col"` tokens in the order the cells are visited.

### Example

Input: `m = 1, n = 1, r = 0, c = 0`
Output: `"0_0"`
Explanation: The board has a single cell, so the tour is just that cell.

## Approach

Use backtracking. At each step, try the 8 possible knight moves sorted in ascending order of the resulting `(row, col)`. Because moves are tried smallest-first and the first fully completed tour found via depth-first search is returned immediately, that tour is guaranteed to be the lexicographically smallest one (any dead end forces backtracking to the next smallest untried option). Board sizes are small (`m, n <= 5`), so this exhaustive search with pruning completes quickly in practice.

## C# Solution

```csharp
public class Solution 
{
    private static readonly int[][] Moves = new int[][]
    {
        new int[] { -2, -1 }, new int[] { -2, 1 }, new int[] { -1, -2 }, new int[] { -1, 2 },
        new int[] { 1, -2 }, new int[] { 1, 2 }, new int[] { 2, -1 }, new int[] { 2, 1 }
    };

    public string TourOfKnight(int m, int n, int r, int c) 
    {
        var visited = new bool[m, n];
        var path = new List<(int Row, int Col)>();
        visited[r, c] = true;
        path.Add((r, c));

        Backtrack(m, n, r, c, path, visited);

        var sb = new StringBuilder();
        for (int i = 0; i < path.Count; i++) 
        {
            if (i > 0) sb.Append(' ');
            sb.Append(path[i].Row).Append('_').Append(path[i].Col);
        }
        return sb.ToString();
    }

    private bool Backtrack(int m, int n, int r, int c, List<(int Row, int Col)> path, bool[,] visited) 
    {
        if (path.Count == m * n) return true;

        var candidates = new List<(int Row, int Col)>();
        foreach (var move in Moves) 
        {
            int nr = r + move[0], nc = c + move[1];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr, nc]) 
            {
                candidates.Add((nr, nc));
            }
        }
        candidates.Sort();

        foreach (var (nr, nc) in candidates) 
        {
            visited[nr, nc] = true;
            path.Add((nr, nc));

            if (Backtrack(m, n, nr, nc, path, visited)) return true;

            path.RemoveAt(path.Count - 1);
            visited[nr, nc] = false;
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(8^(m*n)) worst case, but heavily pruned in practice for `m, n <= 5`
- **Space:** O(m*n) for the visited grid and recursion stack
