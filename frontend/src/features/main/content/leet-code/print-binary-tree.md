# 655. Print Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, print it into an `m x n` string matrix, where the tree's height determines the number of rows, and the width is `2^(height+1) - 1`, with each node placed according to its position in a complete binary tree layout.

### Example

```
Input: root = [1,2]
Output: [["","1",""],["2","",""]]
```

## Approach

First compute the tree's height to determine the matrix dimensions (`height + 1` rows, `2^(height+1) - 1` columns). Recursively fill the matrix: place the current node's value at the midpoint of its assigned column range, then recurse into the left half of that range (shifted down one row) for the left child, and the right half for the right child — this mirrors how a complete binary tree naturally partitions horizontal space.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<string>> PrintTree(TreeNode root)
    {
        int height = GetHeight(root);
        int rows = height + 1;
        int cols = (1 << rows) - 1;

        var result = new List<IList<string>>();
        for (int i = 0; i < rows; i++)
        {
            var row = new List<string>(new string[cols]);
            for (int j = 0; j < cols; j++)
                row[j] = "";
            result.Add(row);
        }

        Fill(root, result, 0, 0, cols - 1);
        return result;
    }

    private int GetHeight(TreeNode node)
    {
        if (node == null) return -1;
        return 1 + Math.Max(GetHeight(node.left), GetHeight(node.right));
    }

    private void Fill(TreeNode node, List<IList<string>> result, int row, int left, int right)
    {
        if (node == null) return;

        int mid = left + (right - left) / 2;
        result[row][mid] = node.val.ToString();

        Fill(node.left, result, row + 1, left, mid - 1);
        Fill(node.right, result, row + 1, mid + 1, right);
    }
}
```

## Complexity

- **Time:** `O(2^h)`, where `h` is the tree height.
- **Space:** `O(2^h)` for the output matrix.
