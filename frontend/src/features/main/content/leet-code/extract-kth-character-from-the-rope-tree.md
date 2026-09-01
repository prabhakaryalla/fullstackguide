# 2689. Extract Kth Character From The Rope Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Tree, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A **rope tree** is a binary tree used to represent a string efficiently: every leaf node stores a non-empty substring (`val`), and every internal node has no `val` but has a `len` equal to the total length of the string represented by its left subtree. The string represented by the whole tree is the concatenation of all leaf values from left to right (an in-order traversal). Given the root of a rope tree and an integer `k` (1-indexed), return the k-th character of the string represented by the tree.

### Example

Input: root has a left leaf "abc" and a right leaf "def" (so the tree represents "abcdef"), k = 4
Output: "d"
Explanation: The concatenated string is "abcdef" and its 4th character (1-indexed) is 'd'.

## Approach

Recurse down the tree. If the current node is a leaf (no children), the answer is simply `val[k - 1]`. Otherwise, compare `k` against `left.len`, the length of the string represented by the left subtree: if `k` fits within the left subtree, recurse left with the same `k`; otherwise recurse right after subtracting `left.len` from `k`, since the right subtree represents the remaining characters.

## C# Solution

```csharp
public class Solution 
{
    public char GetKthCharacter(RopeTreeNode root, int k)
    {
        if (root.left == null && root.right == null)
        {
            return root.val[k - 1];
        }

        int leftLen = root.left.len;
        if (k <= leftLen)
        {
            return GetKthCharacter(root.left, k);
        }

        return GetKthCharacter(root.right, k - leftLen);
    }
}
```

## Complexity

- **Time:** O(h), where h is the height of the rope tree.
- **Space:** O(h) for the recursion stack.
