# 285. Inorder Successor in BST

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree and a node `p` in it, return the in-order successor of that node — the node with the smallest value greater than `p.val` — or `null` if `p` has no successor.

### Example

```
Input: root = [2,1,3], p = 1
Output: 2
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- All node values are unique.

## Approach

Use the BST ordering property directly instead of an in-order traversal. Walk from the root: whenever the current node's value is greater than `p.val`, it's a candidate successor, so record it and move left (looking for something even closer/smaller but still greater than `p.val`). Whenever the current node's value is less than or equal to `p.val`, move right (the successor must be further along). The last recorded candidate is the answer.

## C# Solution

```csharp
public class Solution
{
    public TreeNode InorderSuccessor(TreeNode root, TreeNode p)
    {
        TreeNode successor = null;
        var current = root;

        while (current != null)
        {
            if (current.val > p.val)
            {
                successor = current;
                current = current.left;
            }
            else
            {
                current = current.right;
            }
        }

        return successor;
    }
}
```

## Complexity

- **Time:** `O(h)` — where `h` is the tree height.
- **Space:** `O(1)` — iterative traversal.
