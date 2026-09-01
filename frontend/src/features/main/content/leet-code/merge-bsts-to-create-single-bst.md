# 1932. Merge BSTs to Create Single BST

**Difficulty:** Hard
**Category:** Array, Hash Table, Tree, Binary Search Tree, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of distinct binary search trees `trees` where each tree's nodes have unique values across all trees, and some leaf nodes may have a value matching the root value of another tree in the array, merge trees together (replacing a leaf with the matching tree's root) until only one BST remains using all nodes, or return `null` if impossible.

### Example

```
Input: trees = [[2,1],[3,2,5],[5,4]]
Output: [3,2,5,1,null,4]
Explanation: The leaf 2 in the third tree's... actually leaf "2" of tree rooted at 3 is replaced by the tree rooted at 2, and leaf "5" is replaced by the tree rooted at 5.
```

### Constraints

- `n == trees.length`
- `1 <= n <= 5 * 10^4`
- Combined total nodes across all trees does not exceed `5 * 10^4`.
- Each tree in `trees` is a valid BST, and all node values across all trees are distinct.

## Approach

Map each tree's root value to its root node, and separately count how many times each value appears as a leaf across all trees. A tree can serve as the single overall root only if its root value never appears as a leaf elsewhere (root count of leaf-occurrences equal to zero). Starting from that root, recursively try to replace any leaf whose value matches another tree's root with that tree's root node (removing the used tree from the map so it is not reused), while ensuring the merged result still satisfies BST ordering (`low < value < high` bounds passed down recursively). If, after all replacements, every original tree was consumed and BST bounds are respected, the final merged tree is the answer; otherwise return `null`.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<int, TreeNode> _rootByValue;
    private Dictionary<int, int> _leafValueCount;
    private int _usedCount;

    public TreeNode CanMerge(IList<TreeNode> trees)
    {
        _rootByValue = new Dictionary<int, TreeNode>();
        _leafValueCount = new Dictionary<int, int>();
        _usedCount = 0;

        foreach (var root in trees)
        {
            _rootByValue[root.val] = root;
            CountLeaves(root, root);
        }

        TreeNode overallRoot = null;
        foreach (var root in trees)
        {
            if (!_leafValueCount.ContainsKey(root.val) || _leafValueCount[root.val] == 0)
            {
                overallRoot = root;
                break;
            }
        }

        if (overallRoot == null) return null;

        _usedCount = 1;
        var merged = Merge(overallRoot, long.MinValue, long.MaxValue);

        return (merged != null && _usedCount == trees.Count) ? merged : null;
    }

    private void CountLeaves(TreeNode node, TreeNode root)
    {
        if (node == null) return;
        if (node.left == null && node.right == null && node != root)
        {
            _leafValueCount[node.val] = _leafValueCount.GetValueOrDefault(node.val, 0) + 1;
            return;
        }
        CountLeaves(node.left, root);
        CountLeaves(node.right, root);
    }

    private TreeNode Merge(TreeNode node, long low, long high)
    {
        if (node == null) return null;
        if (node.val <= low || node.val >= high) return null;

        if (node.left == null && node.right == null && _rootByValue.TryGetValue(node.val, out var replacement) && replacement != node)
        {
            _rootByValue.Remove(node.val);
            _usedCount++;
            return Merge(replacement, low, high);
        }

        var left = Merge(node.left, low, node.val);
        if (node.left != null && left == null) return null;

        var right = Merge(node.right, node.val, high);
        if (node.right != null && right == null) return null;

        node.left = left;
        node.right = right;
        return node;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited a constant number of times overall.
- **Space:** `O(n)` for the root and leaf-count dictionaries, plus recursion depth.
