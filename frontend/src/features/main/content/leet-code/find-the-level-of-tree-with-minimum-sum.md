# 3157. Find the Level of Tree with Minimum Sum

**Difficulty:** Medium
**Category:** Binary Tree, Breadth-First Search, Depth-First Search, Tree

## Problem
Given the root of a binary tree, find the level (1-indexed, root is level 1) whose node values sum to the smallest total among all levels. Return that level number.

## Approach
Traverse the tree level by level using breadth-first search (BFS), accumulating the sum of node values at each level. Track the minimum sum seen so far and the corresponding level index; return that level once the traversal is complete. A depth-first search (DFS) approach recording per-level running sums in an array works equally well.

## C# Solution
```csharp
public class Solution {
    public int MinimumLevel(TreeNode root) {
        int ans = 0;
        long minLevelSum = long.MaxValue;
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        for (int level = 1; queue.Count > 0; level++) {
            long levelSum = 0;
            int sz = queue.Count;
            for (int i = 0; i < sz; i++) {
                TreeNode node = queue.Dequeue();
                levelSum += node.val;
                if (node.left != null)
                    queue.Enqueue(node.left);
                if (node.right != null)
                    queue.Enqueue(node.right);
            }
            if (levelSum < minLevelSum) {
                minLevelSum = levelSum;
                ans = level;
            }
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n)
