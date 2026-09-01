# 3235. Check if the Rectangle Corner Is Reachable

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Depth-First Search, Geometry, Math

## Problem
Given a rectangle with corners at (0,0) and (X, Y), and a list of circles inside it, determine whether it's possible to travel from (0,0) to (X, Y) staying strictly outside every circle (or along the rectangle's boundary), where movement is otherwise unrestricted within the rectangle.

## Approach
The path from (0,0) to (X,Y) is blocked precisely when there exists a chain of overlapping circles that together connect the "left or top" boundary of the rectangle to the "right or bottom" boundary, forming an impassable barrier. Model this using a union-find structure with two virtual nodes: one representing the left/top boundary and one representing the right/bottom boundary. For each circle, union it with the left/top virtual node if it touches or crosses the left or top edge, and with the right/bottom virtual node if it touches or crosses the right or bottom edge. Additionally, union any two circles that overlap (distance between centers is at most the sum of their radii). Finally, (0,0) can reach (X,Y) if and only if the left/top and right/bottom virtual nodes are NOT in the same connected component (since being in the same component means a blocking chain exists).

## C# Solution
```csharp
public class Solution {
    private class UnionFind {
        private readonly int[] id;
        private readonly int[] rank;

        public UnionFind(int n) {
            id = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++)
                id[i] = i;
        }

        public void Union(int u, int v) {
            int i = Find(u);
            int j = Find(v);
            if (i == j) return;
            if (rank[i] < rank[j]) {
                id[i] = j;
            } else if (rank[i] > rank[j]) {
                id[j] = i;
            } else {
                id[i] = j;
                rank[j]++;
            }
        }

        public int Find(int u) {
            if (id[u] != u)
                id[u] = Find(id[u]);
            return id[u];
        }
    }

    public bool CanReachCorner(int X, int Y, int[][] circles) {
        int n = circles.Length;
        UnionFind uf = new UnionFind(n + 2);

        for (int i = 0; i < n; i++) {
            long x = circles[i][0];
            long y = circles[i][1];
            long r = circles[i][2];

            if (x - r <= 0 || y + r >= Y)
                uf.Union(i, n);
            if (x + r >= X || y - r <= 0)
                uf.Union(i, n + 1);

            for (int j = 0; j < i; j++) {
                long x2 = circles[j][0];
                long y2 = circles[j][1];
                long r2 = circles[j][2];
                if ((x - x2) * (x - x2) + (y - y2) * (y - y2) <= (r + r2) * (r + r2))
                    uf.Union(i, j);
            }
        }

        return uf.Find(n) != uf.Find(n + 1);
    }
}
```

## Complexity
- Time: O(n^2 * α(n))
- Space: O(n)
