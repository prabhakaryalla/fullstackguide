# 1315. Sum of Nodes with Even-Valued Grandparent

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the sum of every node's value that has an even-valued grandparent (the parent's parent).

### Example

```
Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 18
```

## Approach

Traverse the tree depth-first while carrying along the values of the current node's parent and grandparent. Whenever the grandparent's value is even, add the current node's value to a running total.

## C# Solution

```csharp
public class Solution
{
    private int total = 0;

    public int SumEvenGrandparent(TreeNode root)
    {
        Dfs(root, null, null);
        return total;
    }

    private void Dfs(TreeNode node, TreeNode parent, TreeNode grandparent)
    {
        if (node == null) return;

        if (grandparent != null && grandparent.val % 2 == 0)
        {
            total += node.val;
        }

        Dfs(node.left, node, parent);
        Dfs(node.right, node, parent);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
