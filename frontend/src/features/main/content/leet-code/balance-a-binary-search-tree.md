# 1382. Balance a Binary Search Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Greedy, Binary Search Tree

## Problem

Given the `root` of a binary search tree, return a height-balanced BST containing the same values.

### Example

```
Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
```

## Approach

An in-order traversal of the BST yields its values in sorted order. From that sorted array, recursively build a balanced tree by always choosing the middle element as the current subtree's root, then recursing on the left and right halves — this guarantees `O(log n)` height.

## C# Solution

```csharp
public class Solution
{
    public TreeNode BalanceBST(TreeNode root)
    {
        var values = new List<int>();
        InOrder(root, values);
        return Build(values, 0, values.Count - 1);
    }

    private void InOrder(TreeNode node, List<int> values)
    {
        if (node == null) return;
        InOrder(node.left, values);
        values.Add(node.val);
        InOrder(node.right, values);
    }

    private TreeNode Build(List<int> values, int lo, int hi)
    {
        if (lo > hi) return null;

        int mid = (lo + hi) / 2;
        var node = new TreeNode(values[mid]);
        node.left = Build(values, lo, mid - 1);
        node.right = Build(values, mid + 1, hi);

        return node;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the sorted values array.
