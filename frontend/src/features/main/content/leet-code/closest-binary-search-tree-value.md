# 270. Closest Binary Search Tree Value

**Difficulty:** Easy
**Category:** Binary Search, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target.

### Example

```
Input: root = [4,2,5,1,3], target = 3.714286
Output: 4
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.

## Approach

Walk down the tree from the root, tracking the closest value seen so far. At each node, compare its distance to the target against the current best; if better, update the best. Then move left if the target is smaller than the current node's value, or right otherwise — exploiting the BST property to discard half the tree at each step.

## C# Solution

```csharp
public class Solution
{
    public int ClosestValue(TreeNode root, double target)
    {
        int closest = root.val;
        var current = root;

        while (current != null)
        {
            if (Math.Abs(current.val - target) < Math.Abs(closest - target))
                closest = current.val;

            current = target < current.val ? current.left : current.right;
        }

        return closest;
    }
}
```

## Complexity

- **Time:** `O(h)` — where `h` is the tree height.
- **Space:** `O(1)` — iterative traversal.
