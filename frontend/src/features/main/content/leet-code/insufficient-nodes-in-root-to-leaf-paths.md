# 1080. Insufficient Nodes in Root to Leaf Paths

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree and an integer `limit`, a node is "insufficient" if every root-to-leaf path through it has a sum strictly less than `limit`. Remove all insufficient nodes and return the resulting tree's root (or `null` if the whole tree is removed).

### Example

```
Input: root = [1,2,3,4,-99,-99,7,8,9,-99,-99,12,13,-99,14], limit = 1
Output: [1,2,3,4,null,null,7,8,9,null,14]
```

## Approach

Recursively process each subtree, passing down the remaining budget (`limit - node.val`) needed from paths continuing below. At a leaf, it's insufficient exactly when its value is less than the remaining `limit`. For internal nodes, recursively prune both children first; if both children end up removed (either they didn't exist, or pruning removed them), the current node has no path reaching a sufficient leaf, so it's removed too.

## C# Solution

```csharp
public class Solution
{
    public TreeNode SufficientSubset(TreeNode root, int limit)
    {
        if (root == null) return null;

        if (root.left == null && root.right == null)
        {
            return root.val < limit ? null : root;
        }

        if (root.left != null) root.left = SufficientSubset(root.left, limit - root.val);
        if (root.right != null) root.right = SufficientSubset(root.right, limit - root.val);

        return (root.left == null && root.right == null) ? null : root;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` recursion depth equal to the tree height.
