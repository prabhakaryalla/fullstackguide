# 1214. Two Sum BSTs

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Binary Search Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the roots of two binary search trees, `root1` and `root2`, and an integer `target`, return `true` if there exists a node in `root1` and a node in `root2` whose values sum to `target`.

### Example

```
Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
Output: true
```

## Approach

Traverse `root1` once, collecting every node value into a `HashSet`. Then traverse `root2`, and for each node check whether `target - node.val` exists in that set — if so, a matching pair exists. Both traversals are simple recursive walks; the tree structure (BST) isn't strictly required for correctness here, only that all values are visited.

## C# Solution

```csharp
public class Solution
{
    public bool TwoSumBSTs(TreeNode root1, TreeNode root2, int target)
    {
        var values = new HashSet<int>();
        CollectValues(root1, values);
        return HasComplement(root2, values, target);
    }

    private void CollectValues(TreeNode node, HashSet<int> values)
    {
        if (node == null) return;
        values.Add(node.val);
        CollectValues(node.left, values);
        CollectValues(node.right, values);
    }

    private bool HasComplement(TreeNode node, HashSet<int> values, int target)
    {
        if (node == null) return false;
        if (values.Contains(target - node.val)) return true;
        return HasComplement(node.left, values, target) || HasComplement(node.right, values, target);
    }
}
```

## Complexity

- **Time:** `O(m + n)`, where `m` and `n` are the node counts of the two trees.
- **Space:** `O(m)` for the value set.
