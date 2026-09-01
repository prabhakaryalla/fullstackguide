# 1584. Min Cost to Connect All Points

**Difficulty:** Medium
**Category:** Array, Union Find, Graph, Minimum Spanning Tree

## Problem

Given an array `points` where `points[i] = [xi, yi]`, the cost to connect two points is their Manhattan distance. Return the minimum total cost to connect all points such that there is exactly one path between any two points (a minimum spanning tree).

### Example

```
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
```

## Approach

This is a classic Minimum Spanning Tree problem over a complete graph where every pair of points has an edge weighted by Manhattan distance. Use Prim's algorithm: start from any point, repeatedly grow the tree by adding the closest unconnected point to the current tree (tracked via a `minDistance` array updated after each addition), which avoids needing to explicitly build all `O(n^2)` edges into a priority queue.

## C# Solution

```csharp
public class Solution
{
    public int MinCostConnectPoints(int[][] points)
    {
        int n = points.Length;
        bool[] inTree = new bool[n];
        int[] minDistance = new int[n];
        Array.Fill(minDistance, int.MaxValue);
        minDistance[0] = 0;

        int totalCost = 0;

        for (int i = 0; i < n; i++)
        {
            int u = -1;
            for (int v = 0; v < n; v++)
            {
                if (!inTree[v] && (u == -1 || minDistance[v] < minDistance[u]))
                {
                    u = v;
                }
            }

            inTree[u] = true;
            totalCost += minDistance[u];

            for (int v = 0; v < n; v++)
            {
                if (!inTree[v])
                {
                    int dist = Math.Abs(points[u][0] - points[v][0]) + Math.Abs(points[u][1] - points[v][1]);
                    minDistance[v] = Math.Min(minDistance[v], dist);
                }
            }
        }

        return totalCost;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — Prim's algorithm over a dense graph.
- **Space:** `O(n)` for the tracking arrays.
