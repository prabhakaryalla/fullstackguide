# 968. Binary Tree Cameras

**Difficulty:** Hard
**Category:** Tree, Dynamic Programming, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, place the minimum number of cameras on nodes so that every node is either covered by a camera on itself, its parent, or one of its children. Return the minimum number of cameras needed.

### Example

```
Input: root = [0,0,null,0,0]
Output: 1
```

## Approach

Post-order DFS where each node reports one of three states: *needs a camera* (uncovered), *has a camera*, or *covered without a camera*. If either child needs a camera, place one at the current node. Otherwise, if either child has a camera, the current node is covered. Otherwise the current node itself needs a camera from its parent. The root is handled specially: if it ends up needing a camera, one more camera must be added.

## C# Solution

```csharp
public class Solution
{
    private int cameras;

    public int MinCameraCover(TreeNode root)
    {
        cameras = 0;
        if (Dfs(root) == 0) cameras++;
        return cameras;
    }

    // 0 = needs camera, 1 = has camera, 2 = covered
    private int Dfs(TreeNode node)
    {
        if (node == null) return 2;

        int left = Dfs(node.left);
        int right = Dfs(node.right);

        if (left == 0 || right == 0)
        {
            cameras++;
            return 1;
        }

        return (left == 1 || right == 1) ? 2 : 0;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
