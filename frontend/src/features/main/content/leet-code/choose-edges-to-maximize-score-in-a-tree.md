# 2378. Choose Edges to Maximize Score in a Tree

**Difficulty:** Medium
**Category:** Dynamic Programming, Tree, Graph
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a weighted tree with `n` nodes numbered `0` to `n - 1`, rooted at node `0`. The tree is given as a 2D array `edges` of length `n`, where `edges[i] = [par_i, weight_i]` means `par_i` is the parent of node `i` and the edge between them has weight `weight_i`. Since the root has no parent, `edges[0] = [-1, -1]`.

You must choose a subset of the edges such that no two chosen edges share a common node (the chosen edges form a matching), maximizing the sum of their weights. Return the maximum possible sum (you may choose no edges, giving a sum of 0).

### Example

Input: `edges = [[-1,-1],[0,5],[0,10],[2,6],[2,4]]`
Output: `11`
Explanation: Choose edges `(0,2)` with weight `10` and `(2,3)` cannot be chosen since node 2 is already used; instead choose `(2,4)` with weight `4` is also blocked. The best matching picks edge `(2,3)` (weight 6) and edge `(0,1)` (weight 5), giving `11`.

## Approach

This is a classic tree DP "maximum weight matching on a tree" problem. For each node `u`, compute two values:

- `dp0[u]`: the best score obtainable in the subtree of `u` given that none of the edges from `u` to its children are chosen (so `u` is "free" to be matched by its parent).
- `dp1[u]`: the best overall score obtainable in the subtree of `u`, allowing `u` to be matched with one of its children if beneficial.

`dp0[u]` is simply the sum of `dp1[c]` over all children `c` (each child subtree is solved independently). For `dp1[u]`, we either keep `dp0[u]` (no edge from `u` used) or pick one child `c` to connect to `u`, gaining `weight(u,c) + dp0[c]` instead of `dp1[c]` for that child while all other children keep their `dp1` value. The answer is `dp1[0]`.

## C# Solution

```csharp
public class Solution 
{
    public long MaxScore(int[][] edges) 
    {
        int n = edges.Length;
        var children = new List<int>[n];
        var weight = new long[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        for (int i = 1; i < n; i++)
        {
            int par = edges[i][0];
            children[par].Add(i);
            weight[i] = edges[i][1];
        }

        var dp0 = new long[n];
        var dp1 = new long[n];

        void Dfs(int u)
        {
            long sum = 0;
            foreach (int c in children[u])
            {
                Dfs(c);
                sum += dp1[c];
            }
            dp0[u] = sum;

            long best = dp0[u];
            foreach (int c in children[u])
            {
                long candidate = sum - dp1[c] + weight[c] + dp0[c];
                if (candidate > best) best = candidate;
            }
            dp1[u] = best;
        }

        Dfs(0);
        return dp1[0];
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
