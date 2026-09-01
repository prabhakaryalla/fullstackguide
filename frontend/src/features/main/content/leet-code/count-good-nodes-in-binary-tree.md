# 1448. Count Good Nodes in Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, a node `X` is "good" if no node on the path from the root to `X` has a value greater than `X`'s value. Return the number of good nodes.

### Example

```
Input: root = [3,1,4,3,null,1,5]
Output: 4
```

## Approach

Perform a depth-first traversal while carrying along the maximum value seen on the path from the root so far. A node is good if its value is greater than or equal to that running maximum. Recurse into both children, updating the running maximum to include the current node's value, and sum the good-node counts from both subtrees.

## C# Solution

```csharp
public class Solution
{
    public int GoodNodes(TreeNode root)
    {
        return Dfs(root, int.MinValue);
    }

    private int Dfs(TreeNode node, int maxSoFar)
    {
        if (node == null) return 0;

        int count = node.val >= maxSoFar ? 1 : 0;
        int newMax = Math.Max(maxSoFar, node.val);

        return count + Dfs(node.left, newMax) + Dfs(node.right, newMax);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
