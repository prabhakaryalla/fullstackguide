# 538. Convert BST to Greater Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree, convert it to a Greater Tree such that every node's new value is the original value plus the sum of all values greater than the original value in the tree.

### Example

```
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^4 <= Node.val <= 10^4`

## Approach

Traverse the tree in reverse in-order (right, node, left), which visits values from largest to smallest. Maintain a running sum of all values visited so far; each node's new value is that running sum after adding the node's own original value, naturally accumulating the sum of all strictly greater values already visited.

## C# Solution

```csharp
public class Solution
{
    private int runningSum = 0;

    public TreeNode ConvertBST(TreeNode root)
    {
        ReverseInorder(root);
        return root;
    }

    private void ReverseInorder(TreeNode node)
    {
        if (node == null) return;

        ReverseInorder(node.right);

        runningSum += node.val;
        node.val = runningSum;

        ReverseInorder(node.left);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
