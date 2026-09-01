# 872. Leaf-Similar Trees

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the roots of two binary trees, return `true` if their leaf-value sequences (read left to right) are identical.

### Example

```
Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true
```

## Approach

Perform a DFS on each tree that visits left subtrees before right subtrees, collecting the value of every leaf node encountered (a node with no children) into a list. Compare the two resulting lists for equality.

## C# Solution

```csharp
public class Solution
{
    public bool LeafSimilar(TreeNode root1, TreeNode root2)
    {
        var leaves1 = new List<int>();
        var leaves2 = new List<int>();

        GetLeaves(root1, leaves1);
        GetLeaves(root2, leaves2);

        return leaves1.SequenceEqual(leaves2);
    }

    private void GetLeaves(TreeNode node, List<int> leaves)
    {
        if (node == null) return;

        if (node.left == null && node.right == null)
        {
            leaves.Add(node.val);
            return;
        }

        GetLeaves(node.left, leaves);
        GetLeaves(node.right, leaves);
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n + m)` for the leaf lists.
