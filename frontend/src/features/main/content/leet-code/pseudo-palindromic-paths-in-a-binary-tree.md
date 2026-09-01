# 1457. Pseudo-Palindromic Paths in a Binary Tree

**Difficulty:** Medium
**Category:** Bit Manipulation, Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree where each node has a digit value `1`-`9`, a root-to-leaf path is "pseudo-palindromic" if some permutation of its node values forms a palindrome (equivalently, at most one digit occurs an odd number of times). Return the number of pseudo-palindromic root-to-leaf paths.

### Example

```
Input: root = [2,3,1,3,1,null,1]
Output: 2
```

## Approach

Track the parity of each digit's occurrence count along the current path using a bitmask, toggling bit `d` for each node with value `d`. At a leaf, the path can form a palindrome exactly when the mask has at most one bit set — checkable with the bit trick `mask & (mask - 1) == 0` (true for zero or a single set bit).

## C# Solution

```csharp
public class Solution
{
    public int PseudoPalindromicPaths(TreeNode root)
    {
        return Dfs(root, 0);
    }

    private int Dfs(TreeNode node, int mask)
    {
        if (node == null) return 0;

        mask ^= 1 << node.val;

        if (node.left == null && node.right == null)
            return (mask & (mask - 1)) == 0 ? 1 : 0;

        return Dfs(node.left, mask) + Dfs(node.right, mask);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
