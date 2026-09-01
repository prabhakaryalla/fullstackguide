# 563. Binary Tree Tilt

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the sum of every node's tilt, where a node's tilt is the absolute difference between the sum of all values in its left subtree and the sum of all values in its right subtree (missing subtrees count as 0).

### Example

```
Input: root = [1,2,3]
Output: 1
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-1000 <= Node.val <= 1000`

## Approach

Recursively compute each subtree's total sum (post-order), and while doing so, accumulate the absolute difference between the left and right subtree sums into a running total tilt.

## C# Solution

```csharp
public class Solution
{
    private int totalTilt = 0;

    public int FindTilt(TreeNode root)
    {
        Sum(root);
        return totalTilt;
    }

    private int Sum(TreeNode node)
    {
        if (node == null) return 0;

        int leftSum = Sum(node.left);
        int rightSum = Sum(node.right);

        totalTilt += Math.Abs(leftSum - rightSum);

        return node.val + leftSum + rightSum;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
