# 897. Increasing Order Search Tree

**Difficulty:** Easy
**Category:** Stack, Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree, rearrange it in place so that it becomes a right-skewed tree (only right children) where the node values appear in increasing order.

### Example

```
Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
```

## Approach

Perform an in-order traversal (which visits BST nodes in increasing order), and as each node is visited, detach its left child and attach it as the right child of whichever node was most recently visited, effectively rebuilding a right-skewed chain on the fly. Use a dummy head node to simplify attaching the very first visited node.

## C# Solution

```csharp
public class Solution
{
    private TreeNode current;

    public TreeNode IncreasingBST(TreeNode root)
    {
        var dummy = new TreeNode(0);
        current = dummy;

        InOrder(root);

        return dummy.right;
    }

    private void InOrder(TreeNode node)
    {
        if (node == null) return;

        InOrder(node.left);

        node.left = null;
        current.right = node;
        current = node;

        InOrder(node.right);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
