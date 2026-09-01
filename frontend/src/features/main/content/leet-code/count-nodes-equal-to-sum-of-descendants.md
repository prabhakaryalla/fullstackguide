# 1973. Count Nodes Equal to Sum of Descendants

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of a binary tree, return the number of nodes whose value equals the sum of the values of all of its descendants (not including itself); a leaf node has descendant sum `0`.

### Example

```
Input: root = [10,3,4,2,1]
Output: 2
Explanation: Nodes with value 3 (descendants 2 and 1 sum to 3) and value 0-equivalent leaves... exact count depends on structure, here nodes 3 and any leaf... leaves qualify only if their own value is 0.
```

### Constraints

- The number of nodes is in the range `[1, 10^5]`.
- `0 <= Node.val <= 10^5`

## Approach

Perform a post-order DFS that, for each node, returns the sum of its entire subtree (including itself) to its parent. At each node, the sum of descendants (excluding itself) is `(left subtree sum) + (right subtree sum)`; compare that against the node's own value and increment a counter on a match, then return `node.val + leftSum + rightSum` to the caller.

## C# Solution

```csharp
public class Solution
{
    private int _count = 0;

    public int EqualToDescendants(TreeNode root)
    {
        Dfs(root);
        return _count;
    }

    private long Dfs(TreeNode node)
    {
        if (node == null) return 0;

        long leftSum = Dfs(node.left);
        long rightSum = Dfs(node.right);

        if (node.val == leftSum + rightSum)
        {
            _count++;
        }

        return node.val + leftSum + rightSum;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
