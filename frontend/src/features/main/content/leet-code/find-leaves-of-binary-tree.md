# 366. Find Leaves of Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree, collect the tree's nodes as if repeatedly removing all current leaf nodes and recording them as a group, until the tree is empty. Return the resulting list of groups.

### Example

```
Input: root = [1,2,3,4,5]
Output: [[4,5,3],[2],[1]]
```

### Constraints

- The number of nodes is in the range `[1, 100]`.

## Approach

Compute each node's height via post-order recursion (a leaf has height 0). A node's height directly corresponds to the round in which it would be "removed" as a leaf, since it can only become a leaf once all nodes beneath it have already been removed. Group node values into result buckets indexed by height, creating a new bucket the first time a given height is encountered.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindLeaves(TreeNode root)
    {
        var result = new List<IList<int>>();
        Dfs(root, result);
        return result;
    }

    private int Dfs(TreeNode node, List<IList<int>> result)
    {
        if (node == null) return -1;

        int leftHeight = Dfs(node.left, result);
        int rightHeight = Dfs(node.right, result);
        int height = Math.Max(leftHeight, rightHeight) + 1;

        if (result.Count == height)
            result.Add(new List<int>());

        result[height].Add(node.val);

        return height;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, plus the output.
