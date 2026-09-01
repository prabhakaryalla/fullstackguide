# 510. Inorder Successor in BST II

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree, Linked List
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a node in a binary search tree where each node also has a pointer to its `parent`, return the in-order successor of that node, or `null` if it has none.

### Example

```
Input: tree = [2,1,3], node = 1
Output: 2
```

## Approach

If the node has a right subtree, its successor is the leftmost node of that subtree (the smallest value greater than the node). Otherwise, the successor is the nearest ancestor for which the node lies in its left subtree — found by walking up through parent pointers as long as the current node is the *right* child of its parent, since only when a node is a *left* child does its parent become a value greater than it.

## C# Solution

```csharp
public class Solution
{
    public Node InorderSuccessor(Node node)
    {
        if (node.right != null)
        {
            node = node.right;
            while (node.left != null)
                node = node.left;

            return node;
        }

        while (node.parent != null && node.parent.right == node)
            node = node.parent;

        return node.parent;
    }
}
```

## Complexity

- **Time:** `O(h)`, where `h` is the tree height.
- **Space:** `O(1)`.
