# 663. Equal Tree Partition

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree, return `true` if it is possible to split it into two trees of equal sum by removing exactly one edge (disconnecting a subtree from its parent).

### Example

```
Input: root = [5,10,10,null,null,2,3]
Output: true
```

## Approach

Compute the sum of every subtree via post-order recursion, recording each subtree's sum in a list. The total tree sum must be even to allow an equal split; if so, check whether any subtree (other than the whole tree itself) has a sum equal to exactly half the total — removing the edge above that subtree splits the tree into two equal halves.

## C# Solution

```csharp
public class Solution
{
    private readonly List<int> subtreeSums = new();

    public bool CheckEqualTree(TreeNode root)
    {
        int totalSum = ComputeSum(root);
        subtreeSums.RemoveAt(subtreeSums.Count - 1);

        if (totalSum % 2 != 0) return false;

        return subtreeSums.Contains(totalSum / 2);
    }

    private int ComputeSum(TreeNode node)
    {
        if (node == null) return 0;

        int sum = node.val + ComputeSum(node.left) + ComputeSum(node.right);
        subtreeSums.Add(sum);

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the subtree-sum list.
