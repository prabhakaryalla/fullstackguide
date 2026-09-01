# 623. Add One Row to Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, an integer `val`, and an integer `depth`, add a new row of nodes with value `val` at the given `depth`, where each existing node at `depth - 1` gets two new children (with its original left and right subtrees reattached beneath those new children).

### Example

```
Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `1 <= depth <= the depth of tree + 1`

## Approach

If `depth == 1`, the entire tree becomes the new left child of a fresh root node. Otherwise, recursively walk down to depth `depth - 1`; at every node found there, insert a new node with `val` between it and each of its existing children, reattaching the original subtrees beneath the new nodes.

## C# Solution

```csharp
public class Solution
{
    public TreeNode AddOneRow(TreeNode root, int val, int depth)
    {
        if (depth == 1)
            return new TreeNode(val) { left = root };

        AddRow(root, val, depth, 1);
        return root;
    }

    private void AddRow(TreeNode node, int val, int depth, int currentDepth)
    {
        if (node == null) return;

        if (currentDepth == depth - 1)
        {
            var newLeft = new TreeNode(val) { left = node.left };
            var newRight = new TreeNode(val) { right = node.right };
            node.left = newLeft;
            node.right = newRight;
            return;
        }

        AddRow(node.left, val, depth, currentDepth + 1);
        AddRow(node.right, val, depth, currentDepth + 1);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
