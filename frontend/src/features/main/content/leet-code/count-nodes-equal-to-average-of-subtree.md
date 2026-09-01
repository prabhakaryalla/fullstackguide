# 2265. Count Nodes Equal to Average of Subtree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the number of nodes where the value of the node equals the average of the values in its subtree (rounded down to the nearest integer).

### Example

```
Input: root = [4,8,5,0,1,null,6]
Output: 5
Explanation:
- Node 4: average of [4,8,5,0,1,6] = 24/6 = 4 ✓
- Node 8: average of [8,0,1] = 9/3 = 3 ✗
- Node 5: average of [5,6] = 11/2 = 5 ✓
- Node 0: average of [0] = 0 ✓
- Node 1: average of [1] = 1 ✓
- Node 6: average of [6] = 6 ✓
Total: 5 nodes
```

## Approach

Use DFS to compute for each node: (1) sum of values in subtree, (2) count of nodes in subtree. Then check if node value equals the average. Return results up the tree.

## C# Solution

```csharp
public class Solution
{
    private int count = 0;
    
    public int AverageOfSubtree(TreeNode root)
    {
        Dfs(root);
        return count;
    }
    
    private (int sum, int cnt) Dfs(TreeNode node)
    {
        if (node == null) return (0, 0);
        
        var left = Dfs(node.left);
        var right = Dfs(node.right);
        
        int sum = node.val + left.sum + right.sum;
        int cnt = 1 + left.cnt + right.cnt;
        
        if (node.val == sum / cnt) count++;
        
        return (sum, cnt);
    }
}
```

## Complexity

- **Time:** O(n) for DFS traversal.
- **Space:** O(h) for recursion where h is tree height.
