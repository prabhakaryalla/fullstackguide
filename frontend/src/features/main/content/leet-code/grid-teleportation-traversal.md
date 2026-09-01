# 3552. Grid Teleportation Traversal

**Difficulty:** Medium
**Category:** Breadth-First Search, Matrix, Hash Table

## Problem

You are given an `m x n` grid of characters. Each cell is either `'.'` (empty), `'#'` (obstacle, cannot be entered), or an uppercase letter representing a portal. All cells sharing the same portal letter are connected: from a cell with that letter, you may teleport to any other cell sharing the same letter at zero cost, but each portal letter may be used for teleportation at most once overall (after using it, that letter becomes unusable for future teleports).

You start at the top-left cell `(0, 0)` and want to reach the bottom-right cell `(m - 1, n - 1)`. In one move you can step to an adjacent cell (up, down, left, right) at a cost of `1`, or teleport to any other cell sharing your current cell's portal letter at a cost of `0`. Return the minimum number of moves required to reach the bottom-right cell, or `-1` if it is impossible.

### Example

`matrix = [[".",".","."],[".","#","."],[".",".","."]]` (no portals, one obstacle in the middle). The shortest path must go around the obstacle, requiring `4` moves.

## Approach

Run a BFS from `(0, 0)`. Group all cell coordinates by their portal letter. When the BFS first visits a cell containing a letter that hasn't been used yet, enqueue every other cell sharing that letter at the *same* distance (since teleporting is free), then mark the letter as used so it is never expanded again. Also enqueue the four grid neighbors at distance + 1 as usual. Track visited cells to avoid reprocessing. Return the distance at which the bottom-right cell is first reached.

## C# Solution

```csharp
public class Solution 
{
    public int MinMoves(string[] matrix) 
    {
        int m = matrix.Length;
        int n = matrix[0].Length;

        if (matrix[0][0] == '#' || matrix[m - 1][n - 1] == '#')
        {
            return -1;
        }

        Dictionary<char, List<int[]>> portals = new Dictionary<char, List<int[]>>();
        for (int r = 0; r < m; r++)
        {
            for (int c = 0; c < n; c++)
            {
                char ch = matrix[r][c];
                if (ch != '.' && ch != '#')
                {
                    if (!portals.ContainsKey(ch))
                    {
                        portals[ch] = new List<int[]>();
                    }
                    portals[ch].Add(new int[] { r, c });
                }
            }
        }

        bool[,] visited = new bool[m, n];
        HashSet<char> usedPortals = new HashSet<char>();
        Queue<int[]> queue = new Queue<int[]>();
        queue.Enqueue(new int[] { 0, 0, 0 });
        visited[0, 0] = true;

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            int[] cur = queue.Dequeue();
            int r = cur[0], c = cur[1], dist = cur[2];

            if (r == m - 1 && c == n - 1)
            {
                return dist;
            }

            char ch = matrix[r][c];
            if (ch != '.' && ch != '#' && !usedPortals.Contains(ch))
            {
                usedPortals.Add(ch);
                foreach (int[] cell in portals[ch])
                {
                    int nr = cell[0], nc = cell[1];
                    if (!visited[nr, nc])
                    {
                        visited[nr, nc] = true;
                        queue.Enqueue(new int[] { nr, nc, dist });
                    }
                }
            }

            for (int k = 0; k < 4; k++)
            {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if (matrix[nr][nc] == '#' || visited[nr, nc]) continue;
                visited[nr, nc] = true;
                queue.Enqueue(new int[] { nr, nc, dist + 1 });
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
