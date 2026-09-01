# 501. Find Mode in Binary Search Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree (BST) with duplicates, return all the mode(s) (the most frequently occurring element) in it. If the tree has more than one mode, return them in any order.

### Example

```
Input: root = [1,null,2,2]
Output: [2]
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-10^5 <= Node.val <= 10^5`

## Approach

An in-order traversal of a BST visits values in sorted order, so equal values always appear consecutively. Track the value of the previously visited node and a running count of the current streak; whenever the streak's count exceeds the best seen so far, reset the mode list to just this value, and whenever it ties the best, add this value to the mode list.

## C# Solution

```csharp
public class Solution
{
    private int currentCount = 0;
    private int maxCount = 0;
    private int? previousVal = null;
    private readonly List<int> modes = new();

    public int[] FindMode(TreeNode root)
    {
        InorderTraversal(root);
        return modes.ToArray();
    }

    private void InorderTraversal(TreeNode node)
    {
        if (node == null) return;

        InorderTraversal(node.left);

        if (previousVal.HasValue && previousVal.Value == node.val)
            currentCount++;
        else
            currentCount = 1;

        if (currentCount > maxCount)
        {
            maxCount = currentCount;
            modes.Clear();
            modes.Add(node.val);
        }
        else if (currentCount == maxCount)
        {
            modes.Add(node.val);
        }

        previousVal = node.val;

        InorderTraversal(node.right);
    }
}
```

## Complexity

- **Time:** `O(n)` — a single in-order traversal.
- **Space:** `O(h)` for the recursion stack, plus the output.
