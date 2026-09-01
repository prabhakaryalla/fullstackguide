# 653. Two Sum IV - Input is a BST

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Search Tree, Hash Table, Two Pointers, Binary Tree

## Problem

Given the `root` of a binary search tree and an integer `k`, return `true` if there exist two elements in the tree whose sum equals `k`.

### Example

```
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.

## Approach

Traverse the tree (in any order) while maintaining a hash set of values seen so far. At each node, check whether its complement (`k - node.val`) has already been seen; if so, a valid pair exists. Otherwise, add the current value to the set and continue into both children.

## C# Solution

```csharp
public class Solution
{
    public bool FindTarget(TreeNode root, int k)
    {
        var seen = new HashSet<int>();
        return Dfs(root, k, seen);
    }

    private bool Dfs(TreeNode node, int k, HashSet<int> seen)
    {
        if (node == null) return false;

        if (seen.Contains(k - node.val)) return true;

        seen.Add(node.val);

        return Dfs(node.left, k, seen) || Dfs(node.right, k, seen);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the hash set.
