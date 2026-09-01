# 1483. Kth Ancestor of a Tree Node

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Tree, Binary Search, Binary Lifting

## Problem

Design a `TreeAncestor` class for a tree with `n` nodes given by a `parent` array (`parent[i]` is the parent of node `i`, `-1` for the root). Implement `GetKthAncestor(node, k)`, returning the `k`-th ancestor of `node`, or `-1` if it doesn't exist.

### Example

```
Input: ["TreeAncestor","getKthAncestor","getKthAncestor","getKthAncestor"]
[[7,[-1,0,0,1,1,2,2]],[3,1],[5,2],[6,3]]
Output: [null,1,0,-1]
```

## Approach

Use binary lifting: precompute `up[j][node]`, the `2^j`-th ancestor of `node`, for `j` from `0` up to `log2(n)`. The base level `up[0]` is simply the direct parent array; each subsequent level combines two hops of the previous level: `up[j][node] = up[j-1][up[j-1][node]]`. To answer a query, decompose `k` into its binary representation and jump through the corresponding precomputed ancestor tables bit by bit.

## C# Solution

```csharp
public class TreeAncestor
{
    private readonly int[][] up;
    private readonly int log;

    public TreeAncestor(int n, int[] parent)
    {
        log = Math.Max(1, (int)Math.Ceiling(Math.Log2(Math.Max(n, 2))));
        up = new int[log + 1][];
        for (int j = 0; j <= log; j++) up[j] = new int[n];

        for (int i = 0; i < n; i++) up[0][i] = parent[i];

        for (int j = 1; j <= log; j++)
        {
            for (int i = 0; i < n; i++)
            {
                int mid = up[j - 1][i];
                up[j][i] = mid == -1 ? -1 : up[j - 1][mid];
            }
        }
    }

    public int GetKthAncestor(int node, int k)
    {
        for (int j = 0; j <= log && node != -1; j++)
        {
            if (((k >> j) & 1) == 1)
                node = up[j][node];
        }

        return node;
    }
}
```

## Complexity

- **Time:** `O(n log n)` to build; `O(log k)` per query.
- **Space:** `O(n log n)` for the ancestor tables.
