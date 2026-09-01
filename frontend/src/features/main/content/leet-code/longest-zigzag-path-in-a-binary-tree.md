# 1372. Longest ZigZag Path in a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, a zigzag path alternates between moving to a left child and a right child at each step. Return the length (number of edges) of the longest zigzag path in the tree.

### Example

```
Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1,null,1]
Output: 3
```

## Approach

Perform a depth-first traversal that, at each node, tracks the length of the zigzag path ending there in each of the two possible last directions (having just gone left, or just gone right). Moving left extends the "went-right" length from the parent by one (or restarts at length `1` if the parent just went left), and symmetrically for moving right. Track the overall maximum across all nodes and directions.

## C# Solution

```csharp
public class Solution
{
    private int best = 0;

    public int LongestZigZag(TreeNode root)
    {
        Dfs(root);
        return best;
    }

    // Returns (longest zigzag ending here going left next, going right next)
    private (int left, int right) Dfs(TreeNode node)
    {
        if (node == null) return (-1, -1);

        var (leftFromLeftChild, rightFromLeftChild) = Dfs(node.left);
        var (leftFromRightChild, rightFromRightChild) = Dfs(node.right);

        int goLeft = rightFromLeftChild + 1;
        int goRight = leftFromRightChild + 1;

        best = Math.Max(best, Math.Max(goLeft, goRight));

        return (goLeft, goRight);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
