# 1022. Sum of Root To Leaf Binary Numbers

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree where each node has a value `0` or `1`, each root-to-leaf path represents a binary number (starting with the most significant bit). Return the sum of these numbers over all leaves.

### Example

```
Input: root = [1,0,1,0,1,0,1]
Output: 22
```

## Approach

Perform a depth-first traversal, carrying along the binary value accumulated so far. At each node, extend the running value with `current * 2 + node.val` (equivalent to shifting the binary number left and appending a bit). When a leaf is reached, that running value is the number represented by the path, so return it up; internal nodes sum the contributions of their subtrees.

## C# Solution

```csharp
public class Solution
{
    public int SumRootToLeaf(TreeNode root)
    {
        return Dfs(root, 0);
    }

    private int Dfs(TreeNode node, int current)
    {
        if (node == null) return 0;

        current = current * 2 + node.val;

        if (node.left == null && node.right == null) return current;

        return Dfs(node.left, current) + Dfs(node.right, current);
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` recursion depth equal to the tree height.
