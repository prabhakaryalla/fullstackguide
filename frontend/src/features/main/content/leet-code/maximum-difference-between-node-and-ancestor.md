# 1026. Maximum Difference Between Node and Ancestor

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, find the maximum value of `|a.val - b.val|` over all pairs of nodes where `a` is an ancestor of `b`.

### Example

```
Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
```

## Approach

Do a depth-first traversal carrying the minimum and maximum values seen along the path from the root to the current node. At each node, update these running bounds with the node's own value, and the maximum difference achievable involving this node as a descendant of that path is `currentMax - currentMin`. Take the best of this value across all nodes (naturally maximized at the leaves, since the min/max only widen going down).

## C# Solution

```csharp
public class Solution
{
    public int MaxAncestorDiff(TreeNode root)
    {
        return Dfs(root, root.val, root.val);
    }

    private int Dfs(TreeNode node, int currentMin, int currentMax)
    {
        if (node == null) return currentMax - currentMin;

        currentMin = Math.Min(currentMin, node.val);
        currentMax = Math.Max(currentMax, node.val);

        int leftDiff = Dfs(node.left, currentMin, currentMax);
        int rightDiff = Dfs(node.right, currentMin, currentMax);

        return Math.Max(leftDiff, rightDiff);
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` recursion depth equal to the tree height.
