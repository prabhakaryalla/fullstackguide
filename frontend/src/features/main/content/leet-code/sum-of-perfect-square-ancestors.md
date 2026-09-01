# 3715. Sum of Perfect Square Ancestors

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Math

## Problem

Given the root of a binary tree where every node has a positive integer value, for every node whose value is a perfect square, add the sum of all its ancestors' values that are also perfect squares. Return the total of these additions across the whole tree.

### Example

A path root(4) → child(9) → grandchild(2): node 9 is a perfect square with ancestor 4 (also a perfect square), contributing 4. Node 4 has no ancestors, contributing 0. Node 2 isn't a perfect square. Total = 4.

## Approach

Depth-first traverse the tree while carrying the running sum of perfect-square ancestor values. At each node, if its value is a perfect square, add the current running sum to the answer, then recurse into children passing an updated running sum that includes this node's value only if it is itself a perfect square.

## C# Solution

```csharp
public class Solution 
{
    private long answer = 0;

    public long SumOfPerfectSquareAncestors(TreeNode root) 
    {
        Dfs(root, 0);
        return answer;
    }

    private void Dfs(TreeNode node, long ancestorSum) 
    {
        if (node == null) return;
        bool isSquare = IsPerfectSquare(node.val);
        if (isSquare) answer += ancestorSum;
        long nextSum = ancestorSum + (isSquare ? node.val : 0);
        Dfs(node.left, nextSum);
        Dfs(node.right, nextSum);
    }

    private bool IsPerfectSquare(int v) 
    {
        int r = (int)Math.Sqrt(v);
        return r * r == v || (r + 1) * (r + 1) == v;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(h) recursion stack, where h is tree height
