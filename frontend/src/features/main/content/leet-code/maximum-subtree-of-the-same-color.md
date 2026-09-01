# 3004. Maximum Subtree of the Same Color

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Array

## Problem

You are given a tree rooted at node `0` with `n` nodes, described by a 0-indexed 2D array `edges` where `edges[i] = [ui, vi]` means `vi` is a child of `ui`. You are also given a 0-indexed array `colors`, where `colors[i]` is the color of node `i`. A subtree is considered **same-colored** if every node inside it (including the subtree root) has the same color. Return the maximum number of nodes in any same-colored subtree.

### Example

```
Input: edges = [[0,1],[0,2],[0,3]], colors = [1,1,2,3]
Output: 1
Explanation: No node besides the leaves forms a monochromatic subtree, since node 0's children have
mixed colors, so the largest same-colored subtree is any single leaf node.
```

## Approach

Do a post-order DFS from the root. For a node `u`:

- If any child's subtree isn't monochromatic, or any child has a different color than `u`, then `u`'s subtree isn't monochromatic either — propagate a sentinel value (`-1`).
- Otherwise, `u`'s subtree size is `1` plus the sum of its children's subtree sizes.

Track the maximum valid (non -1) subtree size seen across the whole traversal; that's the answer (at minimum `1`, since a single node is trivially monochromatic).

## C# Solution

```csharp
public class Solution {
    private List<int>[] tree;
    private int[] colors;
    private int ans;

    public int MaximumSubtreeSize(int[][] edges, int[] colors) {
        int n = colors.Length;
        tree = new List<int>[n];
        for (int i = 0; i < n; i++)
            tree[i] = new List<int>();
        foreach (var edge in edges)
            tree[edge[0]].Add(edge[1]);

        this.colors = colors;
        ans = 1;
        Dfs(0);
        return ans;
    }

    // Returns the size of node u's subtree if it's monochromatic, otherwise -1.
    private int Dfs(int u) {
        int res = 1;
        foreach (int v in tree[u]) {
            if (colors[v] != colors[u])
                res = -1;
            int childSize = Dfs(v);
            if (childSize == -1)
                res = -1;
            else if (res != -1)
                res += childSize;
        }
        ans = Math.Max(ans, res);
        return res;
    }
}
```

## Complexity

- Time: O(n) — every node and edge is visited once.
- Space: O(n) — adjacency list plus recursion stack.
