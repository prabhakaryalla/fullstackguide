# 700. Search in a Binary Search Tree

**Difficulty:** Easy
**Category:** Tree, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree and an integer `val`, find the node whose value equals `val` and return the subtree rooted there, or `null` if no such node exists.

### Example

```
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
```

### Constraints

- The number of nodes is in the range `[1, 5000]`.

## Approach

Exploit the BST ordering property: at each node, if the target value is smaller, the answer (if any) must lie in the left subtree; if larger, it must lie in the right subtree. Iteratively descend in the appropriate direction until either the value is found or a `null` node is reached.

## C# Solution

```csharp
public class Solution
{
    public TreeNode SearchBST(TreeNode root, int val)
    {
        while (root != null && root.val != val)
            root = val < root.val ? root.left : root.right;

        return root;
    }
}
```

## Complexity

- **Time:** `O(h)`, where `h` is the tree height.
- **Space:** `O(1)`.
