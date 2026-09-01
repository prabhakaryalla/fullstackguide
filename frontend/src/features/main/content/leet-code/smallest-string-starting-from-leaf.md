# 988. Smallest String Starting From Leaf

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, String, Binary Tree

## Problem

Given the `root` of a binary tree where each node's value is `0`-`25` (mapping to `'a'`-`'z'`), return the lexicographically smallest string formed by any root-to-leaf path, read from the leaf up to the root.

### Example

```
Input: root = [0,1,2,3,4,3,4]
Output: "dba"
```

## Approach

DFS while prepending each visited node's character to the path built so far (so the path string is always leaf-first once complete). At every leaf, compare the completed path against the best one found so far using ordinal string comparison and keep the smaller one.

## C# Solution

```csharp
public class Solution
{
    private string best;

    public string SmallestFromLeaf(TreeNode root)
    {
        best = null;
        Dfs(root, "");
        return best;
    }

    private void Dfs(TreeNode node, string path)
    {
        if (node == null) return;

        path = (char)('a' + node.val) + path;

        if (node.left == null && node.right == null)
        {
            if (best == null || string.Compare(path, best, StringComparison.Ordinal) < 0) best = path;
            return;
        }

        Dfs(node.left, path);
        Dfs(node.right, path);
    }
}
```

## Complexity

- **Time:** `O(n * h)` for path-string construction/comparison at each leaf.
- **Space:** `O(h)` for the recursion stack.
