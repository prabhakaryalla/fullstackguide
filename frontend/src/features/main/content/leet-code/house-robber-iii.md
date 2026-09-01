# 337. House Robber III

**Difficulty:** Medium
**Category:** Dynamic Programming, Tree, Depth-First Search, Binary Tree

## Problem

The houses in this neighborhood form a binary tree; a thief cannot rob two directly connected houses (a node and its parent) in one night without alerting the police. Given the `root` of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

### Example

```
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Rob houses with values 4, 5 (non-adjacent) => wait, rob 1, 3, 1 = 4+5=9 via non-adjacent selection.
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `0 <= Node.val <= 10^4`

## Approach

For each node, compute two values via post-order recursion: the best amount obtainable if this node *is* robbed (its value plus the "not robbed" totals of both children), and the best amount if this node is *not* robbed (the max of robbed/not-robbed for each child). The answer at the root is the maximum of its two values.

## C# Solution

```csharp
public class Solution
{
    public int Rob(TreeNode root)
    {
        var result = Dfs(root);
        return Math.Max(result[0], result[1]);
    }

    private int[] Dfs(TreeNode node)
    {
        if (node == null) return new[] { 0, 0 };

        var left = Dfs(node.left);
        var right = Dfs(node.right);

        int robbed = node.val + left[1] + right[1];
        int notRobbed = Math.Max(left[0], left[1]) + Math.Max(right[0], right[1]);

        return new[] { robbed, notRobbed };
    }
}
```

## Complexity

- **Time:** `O(n)` — each node is visited once.
- **Space:** `O(h)` — recursion depth equal to the tree height.
