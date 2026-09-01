# 543. Diameter of Binary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the length of the diameter of the tree — the length of the longest path between any two nodes, which may or may not pass through the root, measured in number of edges.

### Example

```
Input: root = [1,2,3,4,5]
Output: 3
Explanation: The path [4,2,1,3] or [5,2,1,3] has length 3.
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-100 <= Node.val <= 100`

## Approach

Compute each node's height recursively (post-order), and while doing so, update a running maximum diameter using the sum of the left and right subtree heights at that node — since the longest path through any node passes down into both its subtrees.

## C# Solution

```csharp
public class Solution
{
    private int diameter = 0;

    public int DiameterOfBinaryTree(TreeNode root)
    {
        Height(root);
        return diameter;
    }

    private int Height(TreeNode node)
    {
        if (node == null) return 0;

        int leftHeight = Height(node.left);
        int rightHeight = Height(node.right);

        diameter = Math.Max(diameter, leftHeight + rightHeight);

        return 1 + Math.Max(leftHeight, rightHeight);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
