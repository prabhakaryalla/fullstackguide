# 450. Delete Node in a BST

**Difficulty:** Medium
**Category:** Tree, Binary Search Tree

## Problem

Given the `root` of a binary search tree and a key, delete the node with the given key from the tree and return the new root, maintaining the BST property.

### Example

```
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- Each node's value is unique.
- `-10^5 <= key <= 10^5`

## Approach

Recursively search for the node to delete using standard BST navigation. Once found, handle three cases: a node with no left child is replaced by its right subtree; a node with no right child is replaced by its left subtree; and a node with both children is replaced by its in-order successor's value (the leftmost node of the right subtree), after which that successor is recursively deleted from the right subtree.

## C# Solution

```csharp
public class Solution
{
    public TreeNode DeleteNode(TreeNode root, int key)
    {
        if (root == null) return null;

        if (key < root.val)
        {
            root.left = DeleteNode(root.left, key);
        }
        else if (key > root.val)
        {
            root.right = DeleteNode(root.right, key);
        }
        else
        {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            var successor = root.right;
            while (successor.left != null)
                successor = successor.left;

            root.val = successor.val;
            root.right = DeleteNode(root.right, successor.val);
        }

        return root;
    }
}
```

## Complexity

- **Time:** `O(h)`, where `h` is the tree height.
- **Space:** `O(h)` for the recursion stack.
