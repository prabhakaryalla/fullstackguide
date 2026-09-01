# 3319. K-th Largest Perfect Subtree Size in Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Sorting, Binary Tree

## Problem

Given the `root` of a binary tree and an integer `k`, return the size of the k-th largest **perfect** binary subtree, or `-1` if fewer than `k` exist.

A perfect binary tree is one where all leaves are on the same level and every parent has two children.

### Example

Input: `root = [1,2,3,4,5,6,7], k = 1`

Output: `7`

Explanation: The whole tree is a perfect binary tree of 7 nodes, which is the largest.

## Approach

Perform a post-order DFS. For each node, recursively determine whether its left and right subtrees are perfect and, if so, their height. A node's subtree is perfect if:
- It's a leaf (trivially perfect, size 1), or
- Both children exist, both child subtrees are perfect, and they have equal height.

Whenever a subtree is perfect, record its size in a list. At the end, sort the list descending and return the k-th element, or `-1` if the list has fewer than `k` entries.

## C# Solution

```csharp
public class Solution 
{
    private List<int> sizes = new List<int>();

    public int KthLargestPerfectSubtree(TreeNode root, int k) 
    {
        Dfs(root);
        sizes.Sort((a, b) => b - a);
        return k > sizes.Count ? -1 : sizes[k - 1];
    }

    // Returns (size, height) if the subtree is perfect, otherwise (-1, -1).
    private (int size, int height) Dfs(TreeNode node) 
    {
        if (node == null) return (0, 0);

        if (node.left == null && node.right == null)
        {
            sizes.Add(1);
            return (1, 1);
        }

        var left = Dfs(node.left);
        var right = Dfs(node.right);

        if (node.left == null || node.right == null) return (-1, -1);
        if (left.size == -1 || right.size == -1 || left.height != right.height) return (-1, -1);

        int size = left.size + right.size + 1;
        int height = left.height + 1;
        sizes.Add(size);
        return (size, height);
    }
}
```

## Complexity

- **Time:** O(N log N), dominated by sorting the collected sizes; the DFS itself is O(N).
- **Space:** O(N) for the recursion stack and the sizes list.
