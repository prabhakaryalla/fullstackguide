# 803. Bricks Falling When Hit

**Difficulty:** Hard
**Category:** Union Find, Array, Matrix

## Problem

Given a grid of bricks (`1`) and empty space (`0`), where a brick is "stable" if it is in the top row or touches another stable brick, you are given a sequence of `hits` that erase a brick at each given position (whether or not it exists). After each hit, any bricks no longer connected (directly or indirectly) to the top row fall. Return an array of how many bricks fall after each hit.

### Example

```
Input: grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
Output: [2]
```

## Approach

Process the hits in reverse using Union-Find. First, remove every hit brick from the grid (simulating the final state after all hits), then build a union-find structure over the remaining bricks, connecting each brick to its stable neighbors and to a virtual "roof" node if it's in the top row. Then, walking through the hits in reverse order, add each brick back (if it existed originally): union it with any adjacent bricks (and the roof if in the top row), and the number of bricks that "fall" from this un-hit is the increase in the roof-connected component's size minus one (for the brick just added back itself).

## C# Solution

```csharp
public class Solution
{
    private int[] parent;
    private int[] size;

    public int[] HitBricks(int[][] grid, int[][] hits)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int total = rows * cols + 1;
        parent = new int[total];
        size = new int[total];
        for (int i = 0; i < total; i++) { parent[i] = i; size[i] = 1; }

        var gridCopy = new int[rows][];
        for (int r = 0; r < rows; r++)
            gridCopy[r] = (int[])grid[r].Clone();

        foreach (var hit in hits)
            gridCopy[hit[0]][hit[1]] = 0;

        int roof = rows * cols;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (gridCopy[r][c] == 1)
                {
                    int id = r * cols + c;
                    if (r == 0) Union(id, roof);
                    if (r > 0 && gridCopy[r - 1][c] == 1) Union(id, (r - 1) * cols + c);
                    if (c > 0 && gridCopy[r][c - 1] == 1) Union(id, r * cols + c - 1);
                }
            }
        }

        var result = new int[hits.Length];

        for (int i = hits.Length - 1; i >= 0; i--)
        {
            int r = hits[i][0], c = hits[i][1];

            if (grid[r][c] == 0)
            {
                result[i] = 0;
                continue;
            }

            int before = GetSize(roof);

            gridCopy[r][c] = 1;
            int id = r * cols + c;

            if (r == 0) Union(id, roof);

            int[][] neighbors = { new[] { r - 1, c }, new[] { r + 1, c }, new[] { r, c - 1 }, new[] { r, c + 1 } };
            foreach (var nb in neighbors)
            {
                int nr = nb[0], nc = nb[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && gridCopy[nr][nc] == 1)
                    Union(id, nr * cols + nc);
            }

            int after = GetSize(roof);
            result[i] = Math.Max(0, after - before - 1);
        }

        return result;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x]);
        return parent[x];
    }

    private void Union(int a, int b)
    {
        int rootA = Find(a), rootB = Find(b);
        if (rootA == rootB) return;

        if (size[rootA] < size[rootB])
            (rootA, rootB) = (rootB, rootA);

        parent[rootB] = rootA;
        size[rootA] += size[rootB];
    }

    private int GetSize(int x) => size[Find(x)];
}
```

## Complexity

- **Time:** `O(rows * cols * α(rows * cols))`.
- **Space:** `O(rows * cols)` for the union-find structure.
