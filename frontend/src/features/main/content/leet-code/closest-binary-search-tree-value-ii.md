# 272. Closest Binary Search Tree Value II

**Difficulty:** Hard
**Category:** Two Pointers, Stack, Tree, Binary Search Tree, Binary Tree

## Problem

Given the root of a binary search tree, a target value, and an integer `k`, return the `k` values in the BST that are closest to the target, in any order.

### Example

```
Input: root = [4,2,5,1,3], target = 3.714286, k = 2
Output: [4,3]
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `k` is a valid positive integer and does not exceed the number of nodes.

## Approach

An in-order traversal produces values in sorted order. Build two stacks: a "predecessors" stack (values `<= target`, obtained via reverse in-order-style traversal stopping just past the target) and a "successors" stack (values `> target`). Repeatedly compare the top of each stack, popping whichever is closer to the target, `k` times, to merge the two sorted sequences by proximity.

## C# Solution

```csharp
public class Solution
{
    public IList<int> ClosestKValues(TreeNode root, double target, int k)
    {
        var predecessors = new Stack<int>();
        var successors = new Stack<int>();

        InitPredecessors(root, target, predecessors);
        InitSuccessors(root, target, successors);

        var result = new List<int>();
        while (result.Count < k)
        {
            if (predecessors.Count == 0 ||
                (successors.Count > 0 && successors.Peek() - target < target - predecessors.Peek()))
            {
                result.Add(successors.Pop());
            }
            else
            {
                result.Add(predecessors.Pop());
            }
        }

        return result;
    }

    private void InitPredecessors(TreeNode node, double target, Stack<int> stack)
    {
        if (node == null) return;
        InitPredecessors(node.left, target, stack);
        if (node.val > target) return;
        stack.Push(node.val);
        InitPredecessors(node.right, target, stack);
    }

    private void InitSuccessors(TreeNode node, double target, Stack<int> stack)
    {
        if (node == null) return;
        InitSuccessors(node.right, target, stack);
        if (node.val <= target) return;
        stack.Push(node.val);
        InitSuccessors(node.left, target, stack);
    }
}
```

## Complexity

- **Time:** `O(n)` to build both stacks in the worst case, plus `O(k)` to merge.
- **Space:** `O(n)` — for the two stacks.
