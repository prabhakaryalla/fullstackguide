# 3311. Construct 2D Grid Matching Graph Layout

**Difficulty:** Hard
**Category:** Array, Graph, Breadth-First Search, Matrix

## Problem
You are given `n` nodes labeled `0` to `n - 1` and an edge list describing an undirected graph. It is guaranteed the graph can be arranged as a 2D grid (either a single row/column, or a full rectangular grid) where two nodes are connected exactly when they are adjacent (up, down, left, or right) in the grid. Reconstruct and return any valid grid arrangement of the node labels.

## Approach
First determine whether the graph forms a simple path (a 1 × n or n × 1 grid): this is the case exactly when no node has degree greater than 2 and some node has degree 1 (the two grid corners of a true rectangular grid, where both dimensions exceed 1, never have degree 1). If so, walk the path from an endpoint, always moving to the unvisited neighbor.

Otherwise the grid has more than one row and column, so every corner has degree exactly 2. Pick any degree-2 node as the top-left corner; its two neighbors become the first steps of "row 0" and "column 0" respectively. Walk outward along each of those two directions, at each step preferring the neighbor with the smaller degree (a border cell has degree ≤ 3, while an interior cell has degree 4), until a corner (degree 2) is reached, which fixes the number of columns and rows. Once row 0 and column 0 are fully known, every remaining cell `(i, j)` is uniquely determined as the common, not-yet-used neighbor of its up-neighbor `(i-1, j)` and its left-neighbor `(i, j-1)`. Try both directional assignments at the top-left corner (either neighbor can be "right") until one produces a fully consistent grid.

## C# Solution

```csharp
public class Solution 
{
    public int[][] ConstructGridLayout(int n, int[][] edges) 
    {
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges) 
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        if (n == 1) return new int[][] { new int[] { 0 } };

        int startNode = -1;
        for (int i = 0; i < n; i++) 
        {
            if (adj[i].Count == 1) { startNode = i; break; }
        }
        if (startNode != -1) 
        {
            int[] row = new int[n];
            row[0] = startNode;
            int prev = -1, cur = startNode;
            for (int i = 1; i < n; i++) 
            {
                int nxt = adj[cur][0] == prev ? adj[cur][1] : adj[cur][0];
                row[i] = nxt;
                prev = cur;
                cur = nxt;
            }
            return new int[][] { row };
        }

        int corner = -1;
        for (int i = 0; i < n; i++) 
        {
            if (adj[i].Count == 2) { corner = i; break; }
        }

        int a = adj[corner][0], b = adj[corner][1];
        int[][] result = TryBuild(n, adj, corner, a, b) ?? TryBuild(n, adj, corner, b, a);
        return result;
    }

    private int[][] TryBuild(int n, List<int>[] adj, int corner, int rightStart, int downStart) 
    {
        List<int> row0 = new List<int> { corner, rightStart };
        int prev = corner, cur = rightStart;
        while (adj[cur].Count != 2) 
        {
            int next = -1;
            foreach (int nb in adj[cur]) 
            {
                if (nb == prev) continue;
                if (next == -1 || adj[nb].Count < adj[next].Count) next = nb;
            }
            if (next == -1) break;
            row0.Add(next);
            prev = cur;
            cur = next;
        }

        int cols = row0.Count;
        if (cols == 0 || n % cols != 0) return null;
        int rows = n / cols;

        List<int> col0 = new List<int> { corner, downStart };
        prev = corner; cur = downStart;
        while (col0.Count < rows) 
        {
            int next = -1;
            foreach (int nb in adj[cur]) 
            {
                if (nb == prev) continue;
                if (next == -1 || adj[nb].Count < adj[next].Count) next = nb;
            }
            if (next == -1) break;
            col0.Add(next);
            prev = cur;
            cur = next;
        }
        if (col0.Count != rows) return null;

        int[][] grid = new int[rows][];
        for (int i = 0; i < rows; i++) grid[i] = new int[cols];
        for (int j = 0; j < cols; j++) grid[0][j] = row0[j];
        for (int i = 0; i < rows; i++) grid[i][0] = col0[i];

        HashSet<int> used = new HashSet<int>(row0);
        foreach (int v in col0) used.Add(v);

        for (int i = 1; i < rows; i++) 
        {
            for (int j = 1; j < cols; j++) 
            {
                int up = grid[i - 1][j], left = grid[i][j - 1];
                int found = -1;
                foreach (int nb in adj[up]) 
                {
                    if (used.Contains(nb)) continue;
                    if (adj[left].Contains(nb)) { found = nb; break; }
                }
                if (found == -1) return null;
                grid[i][j] = found;
                used.Add(found);
            }
        }
        return grid;
    }
}
```

## Complexity

- **Time:** O(n) — every node and edge is processed a constant number of times.
- **Space:** O(n)
