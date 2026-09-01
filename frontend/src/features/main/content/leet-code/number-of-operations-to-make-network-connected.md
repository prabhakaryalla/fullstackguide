# 1319. Number of Operations to Make Network Connected

**Difficulty:** Medium
**Category:** Union Find, Graph, Depth-First Search, Breadth-First Search

## Problem

Given `n` computers and a list of `connections` (cables between them), return the minimum number of cable moves needed to make the whole network connected, or `-1` if there aren't enough cables.

### Example

```
Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
```

## Approach

If there are fewer than `n - 1` cables, connecting all computers is impossible. Otherwise, use union-find to merge connected computers; any connection joining two computers already in the same set is "redundant" and can be repurposed. The answer is the number of separate components minus one, since each redundant cable can bridge one gap.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public int MakeConnected(int n, int[][] connections)
    {
        if (connections.Length < n - 1) return -1;

        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        foreach (var edge in connections) Union(edge[0], edge[1]);

        int components = 0;
        for (int i = 0; i < n; i++)
        {
            if (Find(i) == i) components++;
        }

        return components - 1;
    }

    private int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

    private void Union(int a, int b)
    {
        int ra = Find(a), rb = Find(b);
        if (ra != rb) parent[ra] = rb;
    }
}
```

## Complexity

- **Time:** `O((n + m) * alpha(n))`.
- **Space:** `O(n)` for the union-find structure.
