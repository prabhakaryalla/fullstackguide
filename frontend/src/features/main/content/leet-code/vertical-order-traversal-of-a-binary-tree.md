# 987. Vertical Order Traversal of a Binary Tree

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Breadth-First Search, Sorting, Binary Tree

## Problem

Given the `root` of a binary tree, return its vertical order traversal: nodes are grouped by column (root at column `0`, left child `column - 1`, right child `column + 1`), columns reported left to right, and within a column nodes are ordered by row top to bottom, then by value for ties in the same row and column.

### Example

```
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
```

## Approach

DFS (or BFS) the tree recording each node's `(column, row, value)`. Sort all recorded nodes by column, then row, then value, and group consecutive entries sharing the same column into the final result.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> VerticalTraversal(TreeNode root)
    {
        var nodes = new List<(int col, int row, int val)>();

        void Dfs(TreeNode node, int col, int row)
        {
            if (node == null) return;
            nodes.Add((col, row, node.val));
            Dfs(node.left, col - 1, row + 1);
            Dfs(node.right, col + 1, row + 1);
        }

        Dfs(root, 0, 0);

        return nodes
            .OrderBy(n => n.col).ThenBy(n => n.row).ThenBy(n => n.val)
            .GroupBy(n => n.col)
            .OrderBy(g => g.Key)
            .Select(g => (IList<int>)g.Select(n => n.val).ToList())
            .ToList();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)`.
